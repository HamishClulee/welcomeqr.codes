import express from 'express'
import compression from 'compression'
import session from 'express-session'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import mongo from 'connect-mongo'
import path from 'path'
import mongoose from 'mongoose'
import passport from 'passport'
import bluebird from 'bluebird'
import multer from 'multer'
import fs from 'fs'
// import winston from 'winston'
import { MONGODB_URI, SESSION_SECRET } from './util/secrets'

const history = require('connect-history-api-fallback')
const cors = require('cors')
const MongoStore = mongo(session)

console.log('firing up.............')
console.warn('firing up.............')
console.error('firing up.............')

/** ---------------------------------------  LOGGING  ------------------------------------------------- */
if (process.env.NODE_ENV === 'production') {
    // winston.createLogger({
    //     level: 'info',
    //     format: winston.format.json(),
    //     defaultMeta: { service: 'user-service' },
    //     transports: [
    //       new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    //       new winston.transports.File({ filename: './logs/combined.log' })
    //     ]
    // })
    const access = fs.createWriteStream('/var/www/welcomeqr/logs/all.log')
    process.stdout.write = process.stderr.write = access.write.bind(access)

    process.on('uncaughtException', function(err) {
        console.error((err && err.stack) ? err.stack : err);
    })
}

/** ---------------------------------------  PASSPORT + MONGO CONFIG  --------------------------------- */
import * as userController from './controllers/user'

const app = express()
const mongoUrl = MONGODB_URI
mongoose.Promise = bluebird
mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
})

/** ---------------------------------------  APP CONFIG  ---------------------------------------------- */
const MINS_15 = 90000
app.set('port', 1980)
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    cookie: {
        sameSite: true,
        maxAge: MINS_15,
        secure: false,
    },
    saveUninitialized: false,
    resave: false,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true,
        ttl: MINS_15,
        autoRemove: 'native'
    })
}))

if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1)

app.use(passport.initialize())
app.use(passport.session())

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

/** ---------------------------------------  APP ROUTING  --------------------------------- */
app.post('/session_challenge', userController.sessionChallenge)

app.post('/login', userController.postLogin)

app.post('/logout', userController.postLogout)

app.post('/forgot', userController.postForgot)

app.post('/reset/:token', userController.postReset)

app.post('/signup', userController.postSignup)

// app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile)
// app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword)
// app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount)

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
app.post('/api/photo', (req: any, res: any): any => {
    upload(req, res, (err) => {
        if(err) {
            return res.end("Error uploading file.")
        }
        res.end(JSON.stringify({ message: 'Upload success' }))
    })
})

app.post('/tester', userController.postSignup)

/** -------------------------------  STATIC FILES AND SPA SERVER  --------------------------------- */
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
