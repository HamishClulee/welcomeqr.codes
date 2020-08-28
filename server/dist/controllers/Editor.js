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
Object.defineProperty(exports, "__esModule", { value: true });
const Editor_1 = require("../models/Editor");
const Subdom_1 = require("../models/Subdom");
const User_1 = require("../models/User");
const Clean_1 = require("../middlewares/Clean");
const adjective = require("../resources/words/adjectives");
const noun = require("../resources/words/nouns");
const adverb = require("../resources/words/adverbs");
const SUBDOMS_ID = '5e52678609948c1e0ec9994f';
let SUBDOMS = [];
const jwt = require('jsonwebtoken');
exports.getHtmlBySubDom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = { subdom: { $eq: req.body.subdom } };
        const editor = yield Editor_1.Editor.findOne(query);
        return Clean_1.default.success(res, 200, { html: editor.html });
    }
    catch (e) {
        return Clean_1.default.apiError('submitNew', e, res);
    }
});
exports.submitNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = { 'userid': req.session.passport.user };
        const decoded = jwt.decode(req.header('Authorization').split(' ')[1]);
        const update = { 'html': req.body.html, 'subdom': decoded.subdom };
        const options = { 'upsert': true, 'new': true, 'setDefaultsOnInsert': true };
        yield Editor_1.Editor.findOneAndUpdate(query, update, options);
        return Clean_1.default.success(res, 200);
    }
    catch (e) {
        return Clean_1.default.apiError('submitNew', e, res);
    }
});
exports.submitSubdom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (SUBDOMS.indexOf(req.body.subdom) === -1) {
            SUBDOMS.push(req.body.subdom);
            yield Subdom_1.Subdom.updateOne({ '_id': SUBDOMS_ID }, { subdoms: SUBDOMS }, { upsert: true });
            yield User_1.User.updateOne({ '_id': req.session.passport.user }, { subdom: req.body.subdom });
            const user = yield User_1.User.findOne({ '_id': req.session.passport.user });
            return Clean_1.default.approve(res, 200, user);
        }
    }
    catch (e) {
        return Clean_1.default.apiError('submitSubdom', e, res);
    }
});
exports.checkSubdom = (req, res) => {
    const okay = SUBDOMS.indexOf(req.body.subdom) === -1;
    return res.status(200).send({ intercept: false, okay });
};
exports.getHTML = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editor = yield Editor_1.Editor.findOne({ 'userid': req.session.passport.user });
        return Clean_1.default.success(res, 200, editor);
    }
    catch (e) {
        Clean_1.default.apiError('getHTML', e, res);
    }
});
exports._precaching = () => {
    return Subdom_1.Subdom.findById(SUBDOMS_ID).exec().then(res => SUBDOMS = res.subdoms);
};
exports.generateRandomSubDom = (req, res) => {
    try {
        const randInd = (len) => {
            return Math.floor(Math.random() * Math.floor(len - 1));
        };
        const ad = adverb.adverbs;
        const nouns = noun.nouns;
        const adj = adjective.adjectives;
        const randSubDom = () => {
            return `${ad[randInd(ad.length)]}-${adj[randInd(adj.length)]}-${nouns[randInd(nouns.length)]}`;
        };
        return Clean_1.default.success(res, 200, randSubDom());
    }
    catch (e) {
        return Clean_1.default.apiError('generateRandomSubdom', e, res);
    }
};
//# sourceMappingURL=Editor.js.map