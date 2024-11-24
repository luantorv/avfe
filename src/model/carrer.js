import { Schema, model } from 'mongoose';

const CareerSchema = new Schema({
  carrer_id: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  type_c: { type: String, required: true, enum: ["Ingreso", "Pregrado", "Grado", "Posgrado", "Diplomatura", "Cursos"], trim: true },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject', // Referencia al modelo de materias
    },
  ],
}, {
  timestamps: true, // Agrega campos `createdAt` y `updatedAt`
},{ collection: 'carrer' })

export default model('Career', CareerSchema, 'carrer');