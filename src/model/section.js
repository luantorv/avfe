import { Schema, Types, model } from 'mongoose';

const sectionSchema = new Schema({
  section_id: { type: Schema.Types.ObjectId, default: Types.ObjectId },
  title: { type: String, required: true, trim: true },
  type_sec: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  status: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  subsections: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Section' // Si las subsecciones son del mismo modelo
    }
  ]
});

export default model('Section', sectionSchema);
