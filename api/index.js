import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserModel } from "./models/User.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";


const PORT = 4000;
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRECT = process.env.JWT_SECRECT;
const ORIGIN = process.env.CLIENT_URL;

mongoose.connect(MONGO_URL);
const app = express();
app.use(cors({ credentials: true, origin: ORIGIN }));
app.use(cookieParser());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json('test ok')
});

app.get('/profile', (req, res) => {
  const token = req.cookies.token
  if (token) {
    jwt.verify(token, JWT_SECRECT, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json('No Token')
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const createdUser = await UserModel.create({ username, password });
    jwt.sign({ userId: createdUser._id }, JWT_SECRECT, {}, (err, token) => {
      if (err) { throw err }
      else {
        res.cookie('token', token).status(201).json({
          id: createdUser._id,
          username
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