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
const fs = require('fs');
const path = require('path');
const emailer = require("../resources/emails/template");
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
        return Clean_1.default.success(res, 200, { html: editor.html }, 'getHtmlBySubDom satisfied.');
    }
    catch (e) {
        return Clean_1.default.apiError('submitNew', e, res);
    }
});
exports.submitNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = { 'userid': String(req.user._id) };
        const update = { 'html': req.body.html, 'subdom': req.body.user.subdom };
        const options = { 'upsert': true, 'new': true, 'setDefaultsOnInsert': true };
        yield Editor_1.Editor.findOneAndUpdate(query, update, options);
        return Clean_1.default.success(res, 200, {}, 'submitNew completed.');
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
            yield User_1.User.updateOne({ '_id': req.user._id }, { subdom: req.body.subdom });
            const user = yield User_1.User.findOne({ '_id': req.user._id });
            if (!user) {
                return Clean_1.default.failure(res, 501, 'submitSubdom => no user exists.');
            }
            return Clean_1.default.approve(res, 200, user, `submitSubdom completed.`);
        }
    }
    catch (e) {
        return Clean_1.default.apiError('submitSubdom', e, res);
    }
});
exports.checkSubdom = (req, res) => {
    const okay = SUBDOMS.indexOf(req.body.subdom) === -1;
    return Clean_1.default.success(res, 200, { okay }, `Subdom okay.`);
};
exports.getHTML = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editor = yield Editor_1.Editor.findOne({ 'userid': req.user._id });
        if (!editor) {
            return Clean_1.default.failure(res, 501, `getHTML => No Editor found.`);
        }
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
exports.generateEmailHTML = (req, res) => {
    try {
        const config = req.body.config;
        const html = emailer.build(config);
        // fs.open(`./email.html`, 'a', (_err, _fileDescriptor) => {
        // 	if (!_err && _fileDescriptor) {
        // 		fs.writeFile(_fileDescriptor, html, (_err) => {
        // 			if (! _err) {
        // 				fs.close(_fileDescriptor, (_err) => {
        // 					if (! _err) {
        // 						return true
        // 					} else {
        // 						return console.log('\x1b[31m%s\x1b[0m', 'Error closing log file that was being appended')
        // 					}
        // 				})
        // 			} else {
        // 				return console.log('\x1b[31m%s\x1b[0m', 'Error appending to the log file')
        // 			}
        // 		})
        // 	} else {
        // 		return console.log('\x1b[31m%s\x1b[0m', 'Error couldn\'t open the log file for appending')
        // 	}
        // })
        Clean_1.default.success(res, 200, html);
    }
    catch (e) {
        return Clean_1.default.apiError('generateEmailHTML', e, res);
    }
};
//# sourceMappingURL=Editor.js.map