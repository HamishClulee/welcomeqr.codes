"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const logPath = process.env.NODE_ENV === 'production' ? '/var/www/welcomeqr.codes/logs/all.log' : './logs.log';
const output = fs_1.default.createWriteStream(logPath);
const errorOutput = fs_1.default.createWriteStream(logPath);
const logger = new console.Console({ stdout: output, stderr: errorOutput });
exports.default = logger;
//# sourceMappingURL=logger.js.map