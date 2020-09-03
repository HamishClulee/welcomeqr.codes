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
import * as auth from '../config/passport'

/** All Auth Routes */
import * as QAuth from '../controllers/QAuth'

/** Middlewares */
import Env from './Environment'
import Log from '../middlewares/Log'
import Clean from '../middlewares/Clean'

const jwt = require('jsonwebtoken')
const tldjs = require('tldjs')

/** App Constants */
const PORT = 1980
const DEV_URL = Env.get().devUrl
const PROD_URL = Env.get().prodUrl

const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient()

class Express {
	public app: express.Application

	constructor () {
		this.app = express()
	}

	public init (): any {

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
			secret: Env.get().appSecret,
			store: new RedisStore({ client: redisClient })
		}))

		if (process.env.NODE_ENV === 'production') { this.app.set('trust proxy', 1) }

		this.app.use(passport.initialize())
		this.app.use(passport.session())

		// Middleware
		this.app.use((req, res, next) => {

			const tld = tldjs.parse(req.header('origin'))

			if (process.env.NODE_ENV === 'production' && tld.isValid && tld.domain === 'welcomeqr.codes' ) {

				res.setHeader('Access-Control-Allow-Origin', req.header('origin'))

			}

			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
			res.locals.user = req.session.user
			next()
		})

		this.app.use(cors({
			origin:
				process.env.NODE_ENV !== 'production' ?
					[DEV_URL, 'http://localhost:7070', '/\.google.com\.com$/']
					: [PROD_URL, '/\.welcomeqr\.codes$/', '/\.google.com\.com$/'],
			credentials: true
		}))

		// this.app.use(lusca.xframe('SAMEORIGIN'))
		// this.app.use(lusca.xssProtection(true))

		/** ---------------------------------------  APP ROUTING  --------------------------------- */

		/** -------------- Auth & Account -------------- */

		// Local
		this.app.post('/auth/login', QAuth.login)
		this.app.post('/auth/signup', QAuth.signup)
		this.app.post('/auth/logout', QAuth.logout)
		this.app.post('/auth/get_user', auth.isReqAllowed, QAuth.getuser)
		this.app.post('/auth/verify_email', QAuth.verifyemail)
		this.app.post('/auth/forgot', QAuth.forgotpassword)
		this.app.post('/auth/reset', QAuth.resetpassword)

		// Helper for frontend, checks if session exists
		// if session => ensures JWT is granted
		// if session & JWT => returns the user linked to the session
		this.app.post('/auth/user', auth.isReqAllowed, QAuth.getuser)

		// Account settings
		this.app.post('/auth/toggle_subscribe', auth.isReqAllowed, QAuth.togglesubscribe)
		this.app.post('/auth/user_settings', auth.isReqAllowed, QAuth.usersettings)

		// Plumbing and Misc
		this.app.post('/auth/contact', QAuth.contact)

		// Google
		this.app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }))

		this.app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/?redirect=true' }),
			(req, res) => {

				let token = jwt.sign({
					userid: req.session.passport.user
				}, Env.get().tokenSecret, { expiresIn: `2 days` })

				res.set('q-token', token)
				res.redirect(`http://localhost:8080/authcb?token=${token.split('.').join('~')}`)

				// Log.error(`req passport ==> ${JSON.stringify(thing)}`)
				// Log.error(`req passport ==> ${JSON.stringify(req.session)}`)
				// Clean.approve(res, 200, {'email': null, 'id': null, 'authed': false, 'subdom': null, 'role': null, 'tier': null, 'token': null})
		})

		/** -------------- Editor -------------- */
		// Protected
		this.app.post('/api/submitnew', auth.isReqAllowed, editor.submitNew)
		this.app.post('/api/checksubdom', auth.isReqAllowed, editor.checkSubdom)
		this.app.post('/api/submitsubdom', auth.isReqAllowed, editor.submitSubdom)
		this.app.post('/api/gethtmlforuser', auth.isReqAllowed, editor.getHTML)
		this.app.post('/api/generatesubdom', auth.isReqAllowed, editor.generateRandomSubDom)

		// Public
		this.app.post('/api/get_html_by_subdomain', editor.getHtmlBySubDom)

		// Future proofing against the day that we have 10 million subdoms, basically load
		// them into memory at spin up to make access faster
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

			if (_error) { return console.log('Error: ', _error) }

			Log.info(
				`Server :: Running @ ${process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL} :: in ${process.env.NODE_ENV} mode`
			, [Log.TAG_RESTARTED])

			return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${PORT}' :: in ${process.env.NODE_ENV} mode`)
		})
	}
}

export default new Express()
