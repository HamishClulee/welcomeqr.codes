'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Editor_1 = require("../models/Editor");
const Suddom_1 = require("../models/Suddom");
const User_1 = require("../models/User");
const errors_1 = require("./errors");
const qauth_1 = __importDefault(require("./qauth"));
const SUBDOMS_ID = '5e52678609948c1e0ec9994f';
let SUBDOMS = [];
exports.submitNew = async (req, res) => {
    try {
        let query = { 'userid': req.session.passport.user };
        let update = { html: req.body.html };
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        await Editor_1.Editor.findOneAndUpdate(query, update, options);
        return res.status(200).send({ userContent: 'El poho loco! You just submitted your html!' });
    }
    catch (e) {
        errors_1.QApiError('postSubmitNew', e, res);
    }
};
exports.submitSubdom = async (req, res) => {
    try {
        if (SUBDOMS.indexOf(req.body.subdom) === -1) {
            SUBDOMS.push(req.body.subdom);
            Suddom_1.Subdom.updateOne({ '_id': SUBDOMS_ID }, { subdoms: SUBDOMS }, { upsert: true });
            await User_1.User.updateOne({ '_id': req.session.passport.user }, { subdom: req.body.subdom });
            const user = await User_1.User.findOne({ '_id': req.session.passport.user });
            let { email, _id, subdom } = user;
            return res.status(200).send({
                userContent: 'Everything sorted', intercept: false, user: qauth_1.default.approve({ id: _id, email, subdom, authed: true })
            });
        }
    }
    catch (e) {
        errors_1.QApiError('postSubmitSubdom', e, res);
    }
};
exports.checkSubdom = (req, res) => {
    let okay = SUBDOMS.indexOf(req.body.subdom) === -1;
    return res.status(200).send({ intercept: false, okay });
};
exports.getHTML = async (req, res) => {
    try {
        const editor = await Editor_1.Editor.findOne({ 'userid': req.session.passport.user });
        return res.status(200).send({ userContent: 'Here is your HTML', editor });
    }
    catch (e) {
        errors_1.QApiError('postGetHTML', e, res);
    }
};
exports.precaching = () => {
    return Suddom_1.Subdom.findById(SUBDOMS_ID).exec().then(res => SUBDOMS = res.subdoms);
};
