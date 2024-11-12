import { Schema, model } from 'mongoose';

const SubjectSchema = new Schema({
    name: {type: String, required: true},
    carrers: {type: [String], required: true},
    professors: {type: [String], required: true},
    students: {type: [String], required: true},
    sectiones: {type: [String], required: true}
}, { collection: 'subject' });

export default model('Subject', SubjectSchema, 'subject');