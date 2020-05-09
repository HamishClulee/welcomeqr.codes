"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const compression = require("compression");
const session = require("express-session");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");
const cors = require("cors");
const redis = require("redis");
const passport = require("passport");
const multer = require("multer");
const editor = require("../controllers/Editor");
const passportConfig = require("../config/passport");
/** Middlewares */
const Environment_1 = require("./Environment");
const Log_1 = require("../middlewares/Log");
/** Routes - Auth */
const SessionChallenge_1 = require("../controllers/Auth/SessionChallenge");
const Logout_1 = require("../controllers/Auth/Logout");
const SignUp_1 = require("../controllers/Auth/SignUp");
const Login_1 = require("../controllers/Auth/Login");
const Forgot_1 = require("../controllers/Auth/Forgot");
const Reset_1 = require("../controllers/Auth/Reset");
const VerifyEmail_1 = require("../controllers/Auth/VerifyEmail");
/** Routes - Editor */
/** App Constants */
const PORT = 1980;
const DEV_URL = Environment_1.default.config().devUrl;
const PROD_URL = Environment_1.default.config().prodUrl;
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient();
class Express {
    constructor() {
        this.app = express();
    }
    init() {
        // this.app.use(ExceptionHandler.logErrors)
        // this.app.use(ExceptionHandler.clientErrorHandler)
        // this.app.use(ExceptionHandler.errorHandler)
        // this.app = ExceptionHandler.notFoundHandler(this.app)
        this.app.set('port', PORT);
        this.app.use(compression());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(session({
            cookie: {
                // sameSite: true,
                maxAge: 1000 * 60 * 60 * 24 // One Day
                // secure: false
            },
            saveUninitialized: false,
            resave: false,
            secret: Environment_1.default.config().appSecret,
            store: new RedisStore({ client: redisClient })
        }));
        if (process.env.NODE_ENV === 'production') {
            this.app.set('trust proxy', 1);
        }
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(cors({
            origin: process.env.NODE_ENV !== 'production' ? [DEV_URL, '/\.google.com\.com$/'] : [PROD_URL, '/\.google.com\.com$/'],
            credentials: true
        }));
        // this.app.use(lusca.xframe('SAMEORIGIN'))
        // this.app.use(lusca.xssProtection(true))
        this.app.use((req, res, next) => {
            res.locals.user = req.session.user;
            next();
        });
        /** ---------------------------------------  APP ROUTING  --------------------------------- */
        /** -------------- Auth -------------- */
        // Local
        this.app.post('/auth/session_challenge', SessionChallenge_1.default.perform);
        this.app.post('/auth/login', Login_1.default.perform);
        this.app.post('/auth/logout', Logout_1.default.perform);
        this.app.post('/auth/signup', SignUp_1.default.perform);
        this.app.post('/auth/verify_email', VerifyEmail_1.default.perform);
        this.app.post('/auth/forgot', Forgot_1.default.perform);
        this.app.post('/auth/reset', Reset_1.default.perform);
        // Google
        this.app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));
        this.app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/?redirect=true' }), (req, res) => {
            res.redirect('/?googleauth=true');
        });
        /** -------------- Editor -------------- */
        this.app.post('/api/submitnew', passportConfig.isAuthenticated, editor.submitNew);
        this.app.post('/api/checksubdom', passportConfig.isAuthenticated, editor.checkSubdom);
        this.app.post('/api/submitsubdom', passportConfig.isAuthenticated, editor.submitSubdom);
        this.app.post('/api/gethtmlforuser', passportConfig.isAuthenticated, editor.getHTML);
        this.app.post('/api/generatesubdom', passportConfig.isAuthenticated, editor.generateRandomSubDom);
        editor._precaching();
        /** ---------------------------------------  IMAGE STORAGE  --------------------------------- */
        const storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, './uploads');
            },
            filename: function (req, file, callback) {
                callback(null, file.fieldname + '-' + Date.now());
            }
        });
        const upload = multer({ storage: storage }).single('img');
        this.app.post('/api/photo', (req, res) => {
            upload(req, res, (err) => {
                if (err) {
                    return res.end('Error uploading file.');
                }
                res.end(JSON.stringify({ message: 'Upload success' }));
            });
        });
        /** -------------------------------  STATIC FILES AND SPA SERVER  --------------------------------- */
        this.app.use('/', express.static(path.join(__dirname, '../../dist/front-end')));
        this.app.use(history({
            verbose: true,
            disableDotRule: true
        }));
        this.app.get('*', express.static(path.join(__dirname, '../../dist/front-end')));
        this.app.listen(PORT, (_error) => {
            if (_error) {
                return console.log('Error: ', _error);
            }
            Log_1.default.info(`Server :: Running @ ${process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL} :: in ${process.env.NODE_ENV} mode`, [Log_1.default.TAG_RESTARTED]);
            return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${PORT}' :: in ${process.env.NODE_ENV} mode`);
        });
    }
}
exports.default = new Express();
//# sourceMappingURL=Express.js.map