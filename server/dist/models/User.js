"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
// ----------------------------------------------------------------------------
// TypeScript Defs ------------------------------------------------------------
// ----------------------------------------------------------------------------
var Role;
(function (Role) {
    Role["Admin"] = "ADMIN";
    Role["User"] = "USER";
})(Role || (Role = {}));
var AccountTier;
(function (AccountTier) {
    AccountTier["Free"] = "FREE";
    AccountTier["Paid"] = "PAID";
    AccountTier["Premium"] = "PREMIUM";
})(AccountTier || (AccountTier = {}));
// ----------------------------------------------------------------------------
// Mongoose Defs --------------------------------------------------------------
// ----------------------------------------------------------------------------
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    accountTier: {
        type: String,
        enum: [AccountTier.Free, AccountTier.Paid, AccountTier.Premium],
        default: AccountTier.Free
    },
    passwordResetToken: String,
    emailVerifyToken: String,
    allowEmails: {
        type: Boolean,
        default: true
    },
    emailVerified: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: [Role.God, Role.Admin],
        default: Role.User
    },
    subdom: { type: String || null, default: null },
    editors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Editor' }],
    google: String,
    tokens: Array
}, { timestamps: true });
userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, undefined, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
userSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
    let userObj = new this();
    this.findOne({ _id: profile.id }, (err, result) => {
        if (!result) {
            userObj.username = profile.displayName;
            userObj.save(cb);
        }
        else {
            cb(err, result);
        }
    });
};
const comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
userSchema.methods.comparePassword = comparePassword;
exports.User = mongoose.model('User', userSchema);
//# sourceMappingURL=User.js.map