import * as mongoose from 'mongoose'

export type SubdomDocument = mongoose.Document & {
	unique: string;
	subdoms: string[];
}

const subdom = new mongoose.Schema({
	unique: String,
	subdoms: [{type: String}]
}, { timestamps: true })

export const Subdom = mongoose.model<SubdomDocument>('Subdom', subdom)
