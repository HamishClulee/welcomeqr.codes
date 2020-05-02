"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
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
    this.findOne({ _id: profile.id }, function (err, result) {
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