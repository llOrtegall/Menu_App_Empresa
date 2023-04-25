import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserModel } from "./models/User.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";


const PORT = 4000;
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRECT = process.env.JWT_SECRECT;
const ORIGIN = process.env.CLIENT_URL;
const BYCRYPSALT = bcrypt.genSaltSync(10)

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

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await UserModel.findOne({ username });
  if (foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password)
    if (passOk) {
      jwt.sign({ userId: foundUser._id, username }, JWT_SECRECT, {}, (err, token) => {
        res.cookie('token', token).json({
          id: foundUser._id
        })
      })
    }
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, BYCRYPSALT);
    const createdUser = await UserModel.create({
      username: username,
      password: hashedPassword
    });
    jwt.sign({ userId: createdUser._id, username }, JWT_SECRECT, {}, (err, token) => {
      if (err) { throw err }
      else {
        res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
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