import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  nombres: String,
  apellidos: String,
  documento: String
}, { timestamps: true });

export const UserModel = mongoose.model('User', UserSchema);