"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const subdom = new mongoose.Schema({
    unique: String,
    subdoms: [{ type: String }]
}, { timestamps: true });
exports.Subdom = mongoose.model('Subdom', subdom);
//# sourceMappingURL=Subdom.js.map