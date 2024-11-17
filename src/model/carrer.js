import { Schema, model } from 'mongoose';

const CareerSchema = new Schema({
  career_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type_c: {
    type: String,
    required: true,
    enum: ['bachelor', 'master', 'doctorate'], // Ejemplo de valores permitidos
    trim: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject', // Referencia al modelo de materias
    },
  ],
}, {
  timestamps: true, // Agrega campos `createdAt` y `updatedAt`
});

export default model('Career', CareerSchema);