import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserModel } from "./models/User.js"
import jwt from "jsonwebtoken";

dotenv.config()
const mongoUrl = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET
mongoose.connect(mongoUrl)

const app = express()
const PORT = 4000

app.get('/test', (req, res) => {
  res.json('test ok')
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const createdUser = await UserModel.create({ username, password })
  jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (token) => {
    if (err) throw err
    res.cookie('token', token).status(201).json('Ok Token')
  })
})

app.listen(PORT, () => {
  console.log("Server Running On Port http://localhost:" + PORT)
})