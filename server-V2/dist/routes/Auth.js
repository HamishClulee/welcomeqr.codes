"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Login_1 = require("../controllers/Auth/Login");
const SignUp_1 = require("../controllers/Auth/SignUp");
const SessionChallenge_1 = require("../controllers/Auth/SessionChallenge");
const Logout_1 = require("../controllers/Auth/Logout");
const { assert, check, sanitize } = require('express-validator');
const router = express_1.Router();
router.post('/session_challenge', SessionChallenge_1.default.perform);
router.post('/login', Login_1.default.perform);
router.post('/signup', SignUp_1.default.perform);
router.post('/logout', Logout_1.default.perform);
// [
// 	assert('email', 'E-mail cannot be blank').notEmpty(),
// 	assert('email', 'E-mail is not valid').isEmail(),
// 	assert('password', 'Password cannot be blank').notEmpty(),
// 	assert('password', 'Password length must be atleast 8 characters').isLength({ min: 8 }),
// 	assert('confirmPassword', 'Confirmation Password cannot be blank').notEmpty(),
// 	sanitize('email').normalizeEmail({ gmail_remove_dots: false })
// ]
exports.default = router;
//# sourceMappingURL=Auth.js.map