'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Editor_1 = require("../models/Editor");
const Suddom_1 = require("../models/Suddom");
const SUBDOMS_IDENTIFIER = 'stay-unique-subdoms';
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
            console.log(err);
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
            console.log(err);
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
        Suddom_1.Subdom.update({ '_id': SUBDOMS_ID }, { subdoms: SUBDOMS }, { upsert: true }, function (err) {
            if (err) {
                console.log(err);
                return res.status(502).send({ userContent: 'Ice cream machine broke, ok, have a nice day', intercept: false });
            }
            else {
                return res.status(200).send({ userContent: 'Moi Fuego! that subby is saved to your user id', intercept: false });
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
exports.precaching = () => {
    return Suddom_1.Subdom.findById(SUBDOMS_ID).exec().then(res => SUBDOMS = res.subdoms);
};
//# sourceMappingURL=editor.js.map