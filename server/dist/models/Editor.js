"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const editor = new mongoose_1.default.Schema({
    userid: String,
    useremail: String,
    subdom: String || null,
    html: String,
    name: String,
}, { timestamps: true });
exports.Editor = mongoose_1.default.model('Editor', editor);
//# sourceMappingURL=Editor.js.map