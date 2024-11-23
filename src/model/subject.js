import { Schema, model } from 'mongoose';

const SubjectSchema = new Schema({
    name: {type: String, required: true},
    carrers: [{ type: Schema.Types,ObjectId, ref: 'Carrer'}],
    professors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    sectiones: [{ type: Schema.Types.ObjectId, ref: 'Section'}],
}, { collection: 'subject' });

export default model('Subject', SubjectSchema, 'subject');