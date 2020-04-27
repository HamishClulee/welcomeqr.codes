import * as mongoose from 'mongoose'

export type EditorDocument = mongoose.Document & {
	userid: string;
	subdom: string | null;
	html: string;
	name: string;
}

const editor = new mongoose.Schema({
	userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	subdom: String || null,
	html: String,
	name: String
}, { timestamps: true })

export const Editor = mongoose.model<EditorDocument>('Editor', editor)
