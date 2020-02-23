import mongoose from 'mongoose'

export type EditorDocument = mongoose.Document & {
    userid: string;
    useremail: string;
    html: string;
    name: string;
};

const editor = new mongoose.Schema({
    userid: String,
    useremail: String,
    html: String,
    name: String,
}, { timestamps: true })

export const Editor = mongoose.model<EditorDocument>('Editor', editor)
