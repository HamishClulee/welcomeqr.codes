'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Editor_1 = require("../models/Editor");
const Suddom_1 = require("../models/Suddom");
const User_1 = require("../models/User");
const logger_1 = __importDefault(require("../logger"));
const SUBDOMS_ID = '5e52678609948c1e0ec9994f';
let SUBDOMS = [];
exports.postSubmitNew = (req, res) => {
    let editor = new Editor_1.Editor({
        html: req.body.html,
        useremail: req.body.user.email,
        userid: req.body.user.id,
        name: req.body.name,
    });
    editor.save(function (err) {
        if (err) {
            logger_1.default.log(err);
            return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day' });
        }
        else {
            return res.status(200).send({ userContent: 'El poho loco! You just submitted your html!' });
        }
    });
};
exports.postGetAllEditorsForUser = (req, res) => {
    Editor_1.Editor.find({ userid: req.body.userid }, function (err, editors) {
        if (err) {
            logger_1.default.log(err);
            return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day' });
        }
        else {
            return res.status(200).send({ userContent: 'I Skweam!', editors });
        }
    });
};
exports.postSubmitSubdom = (req, res) => {
    if (SUBDOMS.indexOf(req.body.subdom) === -1) {
        SUBDOMS.push(req.body.subdom);
        Suddom_1.Subdom.updateOne({ '_id': SUBDOMS_ID }, { subdoms: SUBDOMS }, { upsert: true }, function (err) {
            if (err) {
                logger_1.default.log(err);
                return res.status(502).send({ userContent: 'Ice cream machine broke, ok, have a nice day', intercept: false });
            }
            else {
                User_1.User.updateOne({ '_id': req.session.passport.user }, { subdom: req.body.subdom }, function (err, user) {
                    if (err) {
                        return res.status(502).send({ userContent: 'Couldnt save user', intercept: false });
                    }
                    else {
                        User_1.User.findOne({ '_id': req.session.passport.user }, function (err, user) {
                            if (err) {
                                return res.status(502).send({ userContent: 'Couldnt retrieve user', intercept: false });
                            }
                            else {
                                let { email, _id, subdom } = user;
                                return res.status(200).send({
                                    userContent: 'Everything sorted',
                                    intercept: false,
                                    user: {
                                        id: _id,
                                        email,
                                        subdom,
                                        authed: true,
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
    else {
        return res.status(501).send({ userContent: 'Cant clone that crazy chicken bro!', intercept: false });
    }
};
exports.postCheckSubdom = (req, res) => {
    let okay = SUBDOMS.indexOf(req.body.subdom) === -1;
    return res.status(200).send({ intercept: false, okay });
};
exports.postGetHTML = (req, res) => {
    if (req.session.passport.user) {
        Editor_1.Editor.findOne({ 'userid': req.session.passport.user }, function (err, editor) {
            if (err) {
                logger_1.default.log(err);
                return res.status(502).send({ userContent: 'Couldnt find user from session info', intercept: true });
            }
            else {
                let html = editor.html || '';
                return res.status(200).send({ userContent: 'Here is your HTML', html });
            }
        });
    }
};
exports.precaching = () => {
    return Suddom_1.Subdom.findById(SUBDOMS_ID).exec().then(res => SUBDOMS = res.subdoms);
};
//# sourceMappingURL=editor.js.map