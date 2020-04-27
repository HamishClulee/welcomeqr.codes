"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const editor = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subdom: String || null,
    html: String,
    name: String
}, { timestamps: true });
exports.Editor = mongoose.model('Editor', editor);
//# sourceMappingURL=Editor.js.map