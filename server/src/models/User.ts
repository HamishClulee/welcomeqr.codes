import bcrypt from 'bcrypt-nodejs'
import mongoose from 'mongoose'
import { EditorDocument } from './Editor'

import { Document, Model, Schema } from 'mongoose';
import { ObjectID } from 'bson';

export interface AuthToken {
    accessToken: string;
    kind: string;
}

type findOrCreateFuntion = (id?: string | ObjectID | null) => void
type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void

export type UserDocument = mongoose.Document & {
    email: string;
    password: string;
    subdom: string | null;
    editors: EditorDocument[],

    passwordResetToken: string;
    passwordResetExpires: Date;

    facebook: string;
    tokens: AuthToken[];

    profile: {
        name: string;
        gender: string;
        location: string;
        website: string;
        picture: string;
    };

    comparePassword: comparePasswordFunction;
    findOrCreate: findOrCreateFuntion;
};

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    subdom: { type: String || null, default: null },
    editors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Editor' }],

    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,

    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
}, { timestamps: true })

userSchema.pre('save', function save(next) {
    const user = this as UserDocument
    if (!user.isModified('password')) { return next() }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err) }
        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
            if (err) { return next(err) }
            user.password = hash
            next()
        })
    })
})

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch)
    })
}
const findOrCreate: findOrCreateFuntion = () => {

}

userSchema.methods.comparePassword = comparePassword
userSchema.methods.findOrCreate = findOrCreate

export const User = mongoose.model<UserDocument>('User', userSchema)
