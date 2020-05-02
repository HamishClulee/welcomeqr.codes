import * as express from 'express'
import * as path from 'path'
import * as compression from 'compression'
import * as session from 'express-session'
import * as bodyParser from 'body-parser'
import * as history from 'connect-history-api-fallback'
import * as cors from 'cors'
import * as redis from 'redis'
import * as lusca from 'lusca'
import * as passport from 'passport'
import * as multer from 'multer'

import * as editor from '../controllers/Editor'
import * as passportConfig from '../config/passport'

/** Middlewares */
import Environment from './Environment'
import Log from '../middlewares/Log'
import ExceptionHandler from '../exception/Handler'

/** Routes - Auth */
import SessionChallenge from '../controllers/Auth/SessionChallenge'
import LogOut from '../controllers/Auth/Logout'
import SignUp from '../controllers/Auth/SignUp'
import LogIn from '../controllers/Auth/Login'

/** Routes - Editor */

/** App Constants */
const PORT = 1980
const DEV_URL = Environment.config().devUrl
const PROD_URL = Environment.config().prodUrl

const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient()

class Express {
	public app: express.Application

	constructor () {
		this.app = express()
	}

	public init (): any {

		// this.app.use(ExceptionHandler.logErrors)
		// this.app.use(ExceptionHandler.clientErrorHandler)
		// this.app.use(ExceptionHandler.errorHandler)
		// this.app = ExceptionHandler.notFoundHandler(this.app)

		this.app.set('port', PORT)
		this.app.use(compression())
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({ extended: true }))

		this.app.use(session({
			cookie: {
				// sameSite: true,
				maxAge: 1000 * 60 * 60 * 24 // One Day
				// secure: false
			},
			saveUninitialized: false,
			resave: false,
			secret: Environment.config().appSecret,
			store: new RedisStore({ client: redisClient })
		}))

		if (process.env.NODE_ENV === 'production') { this.app.set('trust proxy', 1) }

		this.app.use(passport.initialize())
		this.app.use(passport.session())

		this.app.use(cors({
			origin: process.env.NODE_ENV !== 'production' ? [DEV_URL, '/\.google.com\.com$/'] : [PROD_URL, '/\.google.com\.com$/'],
			credentials: true
		}))

		// this.app.use(lusca.xframe('SAMEORIGIN'))
		// this.app.use(lusca.xssProtection(true))

		this.app.use((req, res, next) => {
			res.locals.user = req.session.user
			next()
		})

		/** ---------------------------------------  APP ROUTING  --------------------------------- */

		/** -------------- Auth -------------- */

		// Local
		this.app.post('/auth/session_challenge', SessionChallenge.perform)
		this.app.post('/auth/login', LogIn.perform)
		this.app.post('/auth/logout', LogOut.perform)
		this.app.post('/auth/signup', SignUp.perform)

		// Google
		this.app.get('/auth/google',
			passport.authenticate('google', { scope: ['email'] }))

		this.app.get('/auth/google/callback',
			passport.authenticate('google', { failureRedirect: '/?redirect=true' }),
			(req, res) => {
				res.redirect('/?googleauth=true')
		})

		/** -------------- Editor -------------- */
		this.app.post('/api/submitnew', passportConfig.isAuthenticated, editor.submitNew)
		this.app.post('/api/checksubdom', passportConfig.isAuthenticated, editor.checkSubdom)
		this.app.post('/api/submitsubdom', passportConfig.isAuthenticated, editor.submitSubdom)
		this.app.post('/api/gethtmlforuser', passportConfig.isAuthenticated, editor.getHTML)
		this.app.post('/api/generatesubdom', passportConfig.isAuthenticated, editor.generateRandomSubDom)
		editor._precaching()

		/** ---------------------------------------  IMAGE STORAGE  --------------------------------- */
		const storage = multer.diskStorage({
			destination: function (req, file, callback) {
				callback(null, './uploads')
			},
			filename: function (req, file, callback) {
				callback(null, file.fieldname + '-' + Date.now())
			}
		})
		const upload = multer({ storage : storage }).single('img')

		this.app.post('/api/photo', (req: any, res: any): any => {
			upload(req, res, (err) => {
				if (err) {
					return res.end('Error uploading file.')
				}
				res.end(JSON.stringify({ message: 'Upload success' }))
			})
		})

		/** -------------------------------  STATIC FILES AND SPA SERVER  --------------------------------- */
		this.app.use('/', express.static(path.join(__dirname, '../../dist/front-end')))

		this.app.use(history({
			verbose: true,
			disableDotRule: true
		}))

		this.app.get('*', express.static(path.join(__dirname, '../../dist/front-end')))

		this.app.listen(PORT, (_error: any) => {
			if (_error) {
				return console.log('Error: ', _error)
			}

			Log.info(
				`Server :: Running @ ${process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL} :: in ${process.env.NODE_ENV} mode`
			, [Log.TAG_RESTARTED])

			return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${PORT}' :: in ${process.env.NODE_ENV} mode`)
		})
	}
}

export default new Express()
