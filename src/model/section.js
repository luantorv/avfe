import { Schema, Types, model } from 'mongoose';

const sectionSchema = new Schema({
  title: { type: String, required: true, trim: true },
  type_sec: { type: String, required: true, enum: ["news","pending","info"], trim: true },
  author: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  status: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  subsections: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Section' // hace referencia a que los id's que se guardarán aquí deben ser de otra section
    }
  ]
},{ collection: 'section' });

export default model('Section', sectionSchema, 'section');
