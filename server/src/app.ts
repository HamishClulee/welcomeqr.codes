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
import QLog from './logger'
import { MONGODB_URI, SESSION_SECRET } from './util/secrets'

const MINS_15 = 90000
const DAYS_5 = 1000 * 60 * 60 * 24 * 5
const PORT = 1980
export const DEV_URL = 'http://localhost:8080'
export const PROD_URL = 'https://welcomeqr.codes'
const history = require('connect-history-api-fallback')
const cors = require('cors')
const MongoStore = mongo(session)

/** ---------------------------------------  PASSPORT + MONGO CONFIG  --------------------------------- */
const app = express()
const mongoUrl = MONGODB_URI
mongoose.Promise = bluebird
mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => { QLog.log(`[${new Date()}] Mongo is now connected!`) },
).catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
})

/** ---------------------------------------  APP CONFIG  ---------------------------------------------- */
app.set('port', PORT)
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    cookie: {
        sameSite: true,
        maxAge: DAYS_5,
        secure: false,
    },
    saveUninitialized: false,
    resave: false,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true,
        ttl: DAYS_5,
        autoRemove: 'native'
    })
}))

if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1)

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: process.env.NODE_ENV !== 'production' ? DEV_URL : PROD_URL,
    credentials: true
}))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

/** ---------------------------------------  APP ROUTING  --------------------------------- */
/** Auth */
import * as user from './controllers/user'
app.post('/session_challenge', user.sessionChallenge)
app.post('/login', user.login)
app.post('/logout', user.logout)
app.post('/forgot', user.forgot)
app.post('/reset/:token', user.reset)
app.post('/signup', user.signup)

app.get('/google', passport.authenticate('google', { scope: ['profile'] }))
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/?redirect=true' }), (req, res) => {
    res.redirect('/')
})

app.post('/auth/google', passport.authenticate('google-id-token'), (req, res) => {
    // do something with req.user
    res.send(req.user ? 200 : 401)
  }
)


/** Editor */
import * as editor from './controllers/editor'
import * as passportConfig from './config/passport'
app.post('/api/submitnew', passportConfig.isAuthenticated, editor.submitNew)
app.post('/api/checksubdom', passportConfig.isAuthenticated, editor.checkSubdom)
app.post('/api/submitsubdom', passportConfig.isAuthenticated, editor.submitSubdom)
app.post('/api/gethtmlforuser', passportConfig.isAuthenticated, editor.getHTML)
editor.precaching()

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
