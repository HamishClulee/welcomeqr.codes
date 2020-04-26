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
const lusca = require("lusca");
const passport = require("passport");
const multer = require("multer");
const Environment_1 = require("./Environment");
const PORT = 1980;
const DEV_URL = 'http://localhost:8080';
const PROD_URL = 'https://welcomeqr.codes';
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient();
class Express {
    constructor() {
        this.app = express();
    }
    init() {
        // const port: number = Environment.config().port
        // this.express.use(bodyParser.json())
        // this.express.use(bodyParser.urlencoded({
        // 	limit: Locals.config().maxUploadLimit,
        // 	parameterLimit: Locals.config().maxParameterLimit,
        // 	extended: false
        // }))
        // this.express.disable('x-powered-by')
        // this.express.use(cors({
        // 	origin: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : 'https://welcomeqr.codes',
        // 	credentials: true
        // }))
        // this.express.use(compress())
        // const _static = express.static(path.join(__dirname, '../front-end'), { maxAge: 31557600000 })
        // console.log('-->', path.join(__dirname, '../front-end'))
        // if (process.env.NODE_ENV === 'production') {
        // 	console.log('-->!!', path.join(__dirname, '../front-end'))
        // 	this.express.use(_static)
        // }
        // this.express.use(history({
        // 	verbose: true,
        // 	disableDotRule: true
        // }))
        // this.express.get('/', _static)
        // this.express.get('*', _static)
        this.app.set('port', PORT);
        this.app.use(compression());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(session({
            cookie: {
                sameSite: true,
                maxAge: 1000 * 60 * 60 * 24,
                secure: false
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
            origin: process.env.NODE_ENV !== 'production' ? DEV_URL : PROD_URL,
            credentials: true
        }));
        this.app.use(lusca.xframe('SAMEORIGIN'));
        this.app.use(lusca.xssProtection(true));
        // this.app.use((req, res, next) => {
        // 	res.locals.user = req.user
        // 	next()
        // })
        /** ---------------------------------------  APP ROUTING  --------------------------------- */
        /** Auth */
        // import * as user from './controllers/user'
        // this.app.post('/session_challenge', user.sessionChallenge)
        // this.app.post('/login', user.login)
        // this.app.post('/logout', user.logout)
        // this.app.post('/forgot', user.forgot)
        // this.app.post('/reset/:token', user.reset)
        // this.app.post('/signup', user.signup)
        // app.get('/google', passport.authenticate('google', { scope: ['profile'] }))
        // app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/?redirect=true' }), (req, res) => {
        //     console.log(res)
        //     res.redirect('/')
        // })
        /** Editor */
        // import * as editor from './controllers/editor'
        // import * as passportConfig from './config/passport'
        // this.app.post('/api/submitnew', passportConfig.isAuthenticated, editor.submitNew)
        // this.app.post('/api/checksubdom', passportConfig.isAuthenticated, editor.checkSubdom)
        // this.app.post('/api/submitsubdom', passportConfig.isAuthenticated, editor.submitSubdom)
        // this.app.post('/api/gethtmlforuser', passportConfig.isAuthenticated, editor.getHTML)
        // editor.precaching()
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
        // const _static = express.static(path.join(__dirname, 'front-end'), { maxAge: 31557600000 })
        // if (process.env.NODE_ENV === 'production') {
        // 	this.app.use(_static)
        // }
        this.app.use('/', express.static(path.join(__dirname, '../../dist/front-end')));
        console.log('-->', path.join(__dirname, '../dist/front-end'));
        this.app.use(history({
            verbose: true,
            disableDotRule: true
        }));
        this.app.get('*', express.static(path.join(__dirname, '../../dist/front-end')));
        // Start the server on the specified port
        this.app.listen(PORT, (_error) => {
            if (_error) {
                return console.log('Error: ', _error);
            }
            return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${PORT}'`);
        });
    }
}
exports.default = new Express();
//# sourceMappingURL=Express.js.map