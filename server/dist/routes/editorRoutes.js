"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require("../config/passport");
const express = require("express");
const editor = require("../controllers/Editor");
/**
 * Sets all contained routes at url prefix
 * ===> /api
 *
 * @param app express.Application
 */
exports.setEditorRoutes = (app) => {
    const editorRoutes = express.Router();
    /** -------------- Editor -------------- */
    // Protected
    editorRoutes.post('/submitnew', auth.isReqAllowed, editor.submitNew);
    editorRoutes.post('/checksubdom', auth.isReqAllowed, editor.checkSubdom);
    editorRoutes.post('/submitsubdom', auth.isReqAllowed, editor.submitSubdom);
    editorRoutes.post('/gethtmlforuser', auth.isReqAllowed, editor.getHTML);
    editorRoutes.post('/generatesubdom', auth.isReqAllowed, editor.generateRandomSubDom);
    // Public
    editorRoutes.post('/get_html_by_subdomain', editor.getHtmlBySubDom);
    // Future proofing against the day that we have 10 million subdoms, basically load
    // them into memory at spin up to make access faster
    editor._precaching();
    app.use('/api', editorRoutes);
};
//# sourceMappingURL=editorRoutes.js.map