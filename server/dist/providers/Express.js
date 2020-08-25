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
const auth = require("../config/passport");
/** All Auth Routes */
const QAuth = require("../controllers/QAuth");
/** Middlewares */
const Environment_1 = require("./Environment");
const Log_1 = require("../middlewares/Log");
/** App Constants */
const PORT = 1980;
const DEV_URL = Environment_1.default.get().devUrl;
const PROD_URL = Environment_1.default.get().prodUrl;
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
                // sameSite: true,
                maxAge: 1000 * 60 * 60 * 24 // One Day
                // secure: false
            },
            saveUninitialized: false,
            resave: false,
            secret: Environment_1.default.get().appSecret,
            store: new RedisStore({ client: redisClient })
        }));
        if (process.env.NODE_ENV === 'production') {
            this.app.set('trust proxy', 1);
        }
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(cors({
            origin: process.env.NODE_ENV !== 'production' ? [DEV_URL, '/\.google.com\.com$/'] : [PROD_URL, 'https://*.welcomeqr.codes', '/\.google.com\.com$/'],
            credentials: true
        }));
        // this.app.use(lusca.xframe('SAMEORIGIN'))
        // this.app.use(lusca.xssProtection(true))
        this.app.use((req, res, next) => {
            res.locals.user = req.session.user;
            next();
        });
        /** ---------------------------------------  APP ROUTING  --------------------------------- */
        /** -------------- Auth & Account -------------- */
        // Local
        this.app.post('/auth/login', QAuth.login);
        this.app.post('/auth/signup', QAuth.signup);
        this.app.post('/auth/logout', QAuth.logout);
        this.app.post('/auth/get_user', auth.isReqAllowed, QAuth.getuser);
        this.app.post('/auth/verify_email', QAuth.verifyemail);
        this.app.post('/auth/forgot', QAuth.forgotpassword);
        this.app.post('/auth/reset', QAuth.resetpassword);
        // Account settings
        this.app.post('/auth/toggle_subscribe', auth.isReqAllowed, QAuth.togglesubscribe);
        this.app.post('/auth/user_settings', auth.isReqAllowed, QAuth.usersettings);
        // Plumbing and Misc
        this.app.post('/auth/contact', QAuth.contact);
        // Google
        this.app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));
        this.app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/?redirect=true' }), (req, res) => {
            res.redirect('/?googleauth=true');
        });
        /** -------------- Editor -------------- */
        // Protected
        this.app.post('/api/submitnew', auth.isReqAllowed, editor.submitNew);
        this.app.post('/api/checksubdom', auth.isReqAllowed, editor.checkSubdom);
        this.app.post('/api/submitsubdom', auth.isReqAllowed, editor.submitSubdom);
        this.app.post('/api/gethtmlforuser', auth.isReqAllowed, editor.getHTML);
        this.app.post('/api/generatesubdom', auth.isReqAllowed, editor.generateRandomSubDom);
        // Public
        this.app.post('/public/get_html_by_subdomain', editor.getHtmlBySubDom);
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
            Log_1.default.info(`Server :: Running @ ${process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL} :: in ${process.env.NODE_ENV} mode`, [Log_1.default.TAG_RESTARTED]);
            return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${PORT}' :: in ${process.env.NODE_ENV} mode`);
        });
    }
}
exports.default = new Express();
//# sourceMappingURL=Express.js.map