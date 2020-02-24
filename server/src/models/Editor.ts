import mongoose from 'mongoose'

export type EditorDocument = mongoose.Document & {
    userid: string;
    useremail: string;
    subdom: string | null;
    html: string;
    name: string;
};

const editor = new mongoose.Schema({
    userid: String,
    useremail: String,
    subdom: String || null,
    html: String,
    name: String,
}, { timestamps: true })

export const Editor = mongoose.model<EditorDocument>('Editor', editor)
