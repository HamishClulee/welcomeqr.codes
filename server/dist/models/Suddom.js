"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subdom = new mongoose_1.default.Schema({
    unique: String,
    subdoms: [{ type: String }],
}, { timestamps: true });
exports.Subdom = mongoose_1.default.model('Subdom', subdom);
//# sourceMappingURL=Suddom.js.map