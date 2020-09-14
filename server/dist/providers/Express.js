"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const auth = require("../config/passport");
const admin = require("../controllers/Admin");
/** All Auth functions */
const QAuth = require("../controllers/QAuth");
/** Middlewares */
const Environment_1 = require("./Environment");
const Clean_1 = require("../middlewares/Clean");
const User_1 = require("../models/User");
const jwt = require('jsonwebtoken');
const tldjs = require('tldjs');
/** App Constants */
const PORT = 1980;
const DEV_URL = Environment_1.default.get().devUrl;
const PROD_URL = Environment_1.default.get().prodUrl;
const DEV_PUB_URL = Environment_1.default.get().devPubUrl;
const BASE_URL = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient();
class Express {
    constructor() {
        this.app = express();
    }
    init() {
        this.app.set('port', PORT);
        this.app.use(compression());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(session({
            cookie: {
                // sameSite: process.env.NODE_ENV === 'production' ? true : false,
                maxAge: 1000 * 60 * 60 * 24 // One Day
                // secure: process.env.NODE_ENV === 'production' ? true : false
            },
            saveUninitialized: true,
            resave: true,
            secret: Environment_1.default.get().appSecret,
            store: new RedisStore({ client: redisClient })
        }));
        if (process.env.NODE_ENV === 'production') {
            this.app.set('trust proxy', 1);
        }
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        // Middleware
        this.app.use((req, res, next) => {
            const tld = tldjs.parse(req.header('origin'));
            if (process.env.NODE_ENV === 'production' && tld.isValid && tld.domain === 'welcomeqr.codes') {
                res.setHeader('Access-Control-Allow-Origin', req.header('origin'));
            }
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
            next();
        });
        /**
         * CORS --
         * In Prod => allow from google and all subdoms & welcomeqr and all subdoms
         * In Dev => allow from google and all subdoms and the local host ports used in dev
         * Dev is probably okay to just be * but ¯\_(ツ)_/¯
         */
        this.app.use(cors({
            origin: process.env.NODE_ENV !== 'production' ?
                [DEV_URL, DEV_PUB_URL, '/\.google.com\.com$/']
                : [PROD_URL, '/\.welcomeqr\.codes$/', '/\.google.com\.com$/'],
            credentials: true
        }));
        // if (process.env.NODE_ENV === 'production') {
        // 	this.app.use(lusca.xframe('SAMEORIGIN'))
        // 	this.app.use(lusca.xssProtection(true))
        // }
        /** ---------------------------------------  APP ROUTING  --------------------------------- */
        /**
         * Refactor this to use Express.Router, it's getting messy!
         */
        /** -------------- Auth & Account -------------- */
        // Local
        this.app.post('/auth/login', QAuth.login);
        this.app.post('/auth/signup', QAuth.signup);
        this.app.post('/auth/logout', QAuth.logout);
        this.app.post('/auth/verify_email_token', QAuth.verifyemailtoken);
        this.app.post('/auth/send_verify_email', auth.isReqAllowed, QAuth.sendverifyemail);
        this.app.post('/auth/forgot', QAuth.forgotpassword);
        this.app.post('/auth/reset', QAuth.resetpassword);
        // Helper for frontend, checks if session exists
        // if session => ensures JWT is granted
        // if session & JWT => returns the user linked to the session
        this.app.post('/auth/user', auth.isReqAllowed, QAuth.getuser);
        // Account settings
        this.app.post('/auth/toggle_subscribe', auth.isReqAllowed, QAuth.togglesubscribe);
        this.app.post('/auth/user_settings', auth.isReqAllowed, QAuth.usersettings);
        // Plumbing and Misc
        this.app.post('/auth/contact', QAuth.contact);
        // Google
        this.app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));
        this.app.get('/auth/google/callback', passport.authenticate('google', {
            failureRedirect: `${BASE_URL}/?authRedirect=true`
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            /**
             * Google has returned the email address and verified it, log the user in
             * and grant them a token
             */
            const _user = yield User_1.User.findOne({ _id: req.user._id });
            if (_user) {
                req.logIn(_user, (err) => {
                    if (err) {
                        return Clean_1.default.authError('login::passport::login-err', err, res);
                    }
                    const tokenPayload = {
                        userid: _user._id,
                        email: _user.email,
                        role: _user.role,
                        subdom: _user.subdom
                    };
                    const token = jwt.sign(tokenPayload, Environment_1.default.get().tokenSecret, { expiresIn: `2 days` });
                    // redirect to the FE component set to eat the token and deal with FE auth
                    res.redirect(`${BASE_URL}/authcb?token=${token.split('.').join('~')}`);
                });
            }
            else {
                return Clean_1.default.authError('Passport Google Success CB', 'No user found when using findOne(req.user._id)', res);
            }
        }));
        /** --------------Admin -------------- */
        this.app.post('/admin/get_log_by_day', auth.isReqAllowed, admin.getLogByDay);
        this.app.post('/admin/get_all_log_filenames', auth.isReqAllowed, admin.getAllLogFilenames);
        /** -------------- Editor -------------- */
        // Protected
        this.app.post('/api/submitnew', auth.isReqAllowed, editor.submitNew);
        this.app.post('/api/checksubdom', auth.isReqAllowed, editor.checkSubdom);
        this.app.post('/api/submitsubdom', auth.isReqAllowed, editor.submitSubdom);
        this.app.post('/api/gethtmlforuser', auth.isReqAllowed, editor.getHTML);
        this.app.post('/api/generatesubdom', auth.isReqAllowed, editor.generateRandomSubDom);
        // Public
        this.app.post('/api/get_html_by_subdomain', editor.getHtmlBySubDom);
        // Future proofing against the day that we have 10 million subdoms, basically load
        // them into memory at spin up to make access faster
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
            return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${PORT}' :: in ${process.env.NODE_ENV} mode`);
        });
    }
}
exports.default = new Express();
//# sourceMappingURL=Express.js.map