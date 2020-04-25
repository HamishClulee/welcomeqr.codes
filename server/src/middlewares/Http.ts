import * as cors from 'cors'
import { Application } from 'express'
import * as compress from 'compression'
import * as connect from 'connect-mongo'
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import * as expressValidator from 'express-validator'
import * as path from 'path'

import Log from './Log'
import Locals from '../providers/Locals'
import Passport from '../providers/Passport'

const MongoStore = connect(session)

class Http {
	public static mount(_express: Application): Application {
		Log.info('Booting the \'HTTP\' middleware...')

		// Enables the request body parser
		_express.use(bodyParser.json({
			limit: Locals.config().maxUploadLimit
		}))

		_express.use(bodyParser.urlencoded({
			limit: Locals.config().maxUploadLimit,
			parameterLimit: Locals.config().maxParameterLimit,
			extended: false
		}))

		_express.disable('x-powered-by')

		const options = {
			cookie: {
				sameSite: true,
				maxAge: 1000 * 60 * 60 * 24, // One Day
				secure: false
			},
			saveUninitialized: false,
			resave: false,
			secret: Locals.config().appSecret,
			store: new MongoStore({
				url: process.env.MONGOOSE_URL,
				autoReconnect: true,
				ttl: 1000 * 60 * 60 * 24,
				autoRemove: 'native'
			})
		}

		_express.use(session(options))

		_express.use(cors({
			origin: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : 'https://welcomeqr.codes',
			credentials: true
		}))

		_express.use(compress())

		_express = Passport.mountPackage(_express)

		return _express
	}
}

export default Http
