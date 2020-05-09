import * as bcrypt from 'bcrypt-nodejs'
import * as mongoose from 'mongoose'
import { EditorDocument } from './Editor'

// ----------------------------------------------------------------------------
// TypeScript Defs ------------------------------------------------------------
// ----------------------------------------------------------------------------
enum Role {
	Admin = 'ADMIN',
	User = 'USER'
}

enum AccountTier {
	Free = 'FREE',
	Paid = 'PAID',
	Premium = 'PREMIUM'
}

export type UserDocument = mongoose.Document & {

	email: string;
	password: string;

	accountTier: AccountTier;

	role: Role;
	allowEmails: boolean;
	emailVerified: boolean;
	
	emailVerifyToken: string;
	passwordResetToken: string;

	subdom: string | null;
	editors: EditorDocument[];

	google: String;
	tokens: AuthToken[];

	comparePassword: comparePasswordFunction;
}

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void

export interface AuthToken {
	accessToken: string
	kind: string
}

// ----------------------------------------------------------------------------
// Mongoose Defs --------------------------------------------------------------
// ----------------------------------------------------------------------------
const userSchema = new mongoose.Schema({

	email: { type: String, unique: true },
	password: String,

	accountTier: {
		type: String,
		enum: [ AccountTier.Free, AccountTier.Paid, AccountTier.Premium ],
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
		enum: [ Role.God, Role.Admin ],
		default: Role.User
	}

	subdom: { type: String || null, default: null },
	editors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Editor' }],

	google: String,
	tokens: Array

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

userSchema.statics.findOrCreate = function findOrCreate(profile, cb) {

	let userObj = new this()

	this.findOne({_id : profile.id}, (err, result) => {

		if (!result) {

			userObj.username = profile.displayName
			userObj.save(cb)

		} else {
			cb(err, result)
		}
	})

}

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {

	bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {

		cb(err, isMatch)

	})
}

userSchema.methods.comparePassword = comparePassword

export const User = mongoose.model<UserDocument>('User', userSchema)
