import express from 'express'
import compression from 'compression'  // compresses requests
import session from 'express-session'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import mongo from 'connect-mongo'
import flash from 'express-flash'
import path from 'path'
import mongoose from 'mongoose'
import passport from 'passport'
import bluebird from 'bluebird'
import multer from 'multer'
import winston from 'winston'
import { MONGODB_URI, SESSION_SECRET } from './util/secrets'

const history = require('connect-history-api-fallback')
const cors = require('cors')
const MongoStore = mongo(session)
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: '911911error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

// Controllers (route handlers)
import * as homeController from './controllers/home'
import * as userController from './controllers/user'
// import * as apiController from './controllers/api'
import * as contactController from './controllers/contact'


// API keys and Passport configuration
import * as passportConfig from './config/passport'

// Create Express server
const app = express()

// Connect to MongoDB
const mongoUrl = MONGODB_URI
mongoose.Promise = bluebird

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
    // process.exit();
})

// Express configuration
app.set('port', 1980)
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(cors({
    origin: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : 'https://welcomeqr.codes',
    credentials: true
}))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})
app.use((req, res, next) => {
    // After successful login, redirect back to the intended page
    if (!req.user
            && req.path !== '/login'
            && req.path !== '/signup'
            && !req.path.match(/^\/auth/)
            && !req.path.match(/\./)) {

        req.session.returnTo = req.path

    } else if (req.user && req.path == '/account') {

        req.session.returnTo = req.path

    }
    next()
})

/**
 * Primary app routes.
 */
app.get('/user/session_challenge', userController.sessionChallenge)
app.get('/login', userController.getLogin)
app.post('/login', userController.postLogin)
app.get('/logout', userController.logout)
app.get('/forgot', userController.getForgot)
app.post('/forgot', userController.postForgot)
app.get('/reset/:token', userController.getReset)
app.post('/reset/:token', userController.postReset)
app.get('/signup', userController.getSignup)
app.post('/signup', userController.postSignup)
app.get('/contact', contactController.getContact)
app.post('/contact', contactController.postContact)
app.get('/account', passportConfig.isAuthenticated, userController.getAccount)
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile)
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword)
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount)

const storage = multer.diskStorage({

    destination: function (req, file, callback) {

        callback(null, './uploads')

    },
    filename: function (req, file, callback) {

        callback(null, file.fieldname + '-' + Date.now())

    }

})

const upload = multer({ storage : storage }).single('img')
  
app.post('/api/photo', (req: any, res: any): any => {

    console.log("api photo hit")

    upload(req, res, (err) => {

        if(err) {

            console.log(err)

            return res.end("Error uploading file.")

        }
        res.end("File is uploaded")

    })
})

const _static = express.static(path.join(__dirname, 'front-end'), { maxAge: 31557600000 })

if (process.env.NODE_ENV === 'production') {
    app.use(_static)
}

app.use(history({
    verbose: true,
    disableDotRule: true
}))

app.get('*', _static)

export default app
