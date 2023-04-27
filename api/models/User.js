import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  nombres: { type: String },
  apellidos: { type: String },
  documento: { type: String, unique: true }
}, { timestamps: true });

export const UserModel = mongoose.model('User', UserSchema);