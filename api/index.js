import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserModel } from "./models/User.js";
import jwt from "jsonwebtoken";
import cors from "cors";


const PORT = 4000;
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;
const ORIGIN = process.env.CLIENT_URL;

mongoose.connect(MONGO_URL);
const app = express();

app.use(cors({
  credentials: true,
  origin: ORIGIN
}));
app.use(express.json());

app.get('/test', (req, res) => {
  res.json('test ok')
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const createdUser = await UserModel.create({ username, password });
    jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
      if (err) { throw err }
      else {
        res.cookie('token', token).status(201).json({
          id: createdUser._id
        })
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

app.listen(PORT, () => {
  console.log("Server Running On Port http://localhost:" + PORT)
});