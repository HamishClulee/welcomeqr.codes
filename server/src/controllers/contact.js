"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_validator_1 = require("express-validator");
const transporter = nodemailer_1.default.createTransport({
    service: 'SendGrid',
    auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
    }
});
exports.postContact = async (req, res) => {
    await express_validator_1.check('name', 'Name cannot be blank').not().isEmpty().run(req);
    await express_validator_1.check('email', 'Email is not valid').isEmail().run(req);
    await express_validator_1.check('message', 'Message cannot be blank').not().isEmpty().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.redirect('/contact');
    }
    const mailOptions = {
        to: 'your@email.com',
        from: `${req.body.name} <${req.body.email}>`,
        subject: 'Contact Form',
        text: req.body.message
    };
    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            return res.redirect('/contact');
        }
        res.redirect('/contact');
    });
};
