'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.submitNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = { 'userid': req.session.passport.user };
        let update = { html: req.body.html };
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        yield Editor_1.Editor.findOneAndUpdate(query, update, options);
        return res.status(200).send({ userContent: 'El poho loco! You just submitted your html!' });
    }
    catch (e) {
        errors_1.QApiError('postSubmitNew', e, res);
    }
});
exports.submitSubdom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (SUBDOMS.indexOf(req.body.subdom) === -1) {
            SUBDOMS.push(req.body.subdom);
            Suddom_1.Subdom.updateOne({ '_id': SUBDOMS_ID }, { subdoms: SUBDOMS }, { upsert: true });
            yield User_1.User.updateOne({ '_id': req.session.passport.user }, { subdom: req.body.subdom });
            const user = yield User_1.User.findOne({ '_id': req.session.passport.user });
            let { email, _id, subdom } = user;
            return res.status(200).send({
                userContent: 'Everything sorted', intercept: false, user: qauth_1.default.approve({ id: _id, email, subdom, authed: true })
            });
        }
    }
    catch (e) {
        errors_1.QApiError('postSubmitSubdom', e, res);
    }
});
exports.checkSubdom = (req, res) => {
    let okay = SUBDOMS.indexOf(req.body.subdom) === -1;
    return res.status(200).send({ intercept: false, okay });
};
exports.getHTML = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editor = yield Editor_1.Editor.findOne({ 'userid': req.session.passport.user });
        return res.status(200).send({ userContent: 'Here is your HTML', editor });
    }
    catch (e) {
        errors_1.QApiError('postGetHTML', e, res);
    }
});
exports.precaching = () => {
    return Suddom_1.Subdom.findById(SUBDOMS_ID).exec().then(res => SUBDOMS = res.subdoms);
};
//# sourceMappingURL=editor.js.map