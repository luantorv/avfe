import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    lastname: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date_entry: { type: Date, default: Date.now },
    guest: {type: Boolean, required: true},
    carrers: {type: [String]}, // verifica que sea un array con strings
}, { collection: 'user' });

export default model('User', UserSchema, 'user');
