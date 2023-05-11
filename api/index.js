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

app.post('/Ingresar', async (req, res) => {
  const { username, password } = req.body;

  //TODO: Busca En la Base de Datos el usuario por username Ya que es unique: True
  const foundUser = await UserModel.findOne({ username });
  if (foundUser) {
    //TODO: Si el usuario es encontrado verifica la contraseña encryptada
    const passOk = bcrypt.compareSync(password, foundUser.password)
    if (passOk) {
      jwt.sign({ userId: foundUser._id, username, nombres: foundUser.nombres, apellidos: foundUser.apellidos }, JWT_SECRECT, {}, (err, token) => {
        if (err) { throw err }
        else {
          res.cookie('token', token, { sameSite: 'none', secure: true })
            .json({ id: foundUser._id, username, nombres: foundUser.nombres, apellidos: foundUser.apellidos })
        }
      })
    } else {
      res.status(401).json('Contraseña Invalida')
    }
  } else {
    res.status(400).json('Usuario No Encontrado')
  }
});

app.post('/Registrarse', async (req, res) => {

  const { nombres, apellidos, documento } = req.body;
  const password = `CP${documento.slice(-3)}`
  const username = `CP${documento}`

  try {
    // TODO: Encrypta La Contraseña
    const hashedPassword = bcrypt.hashSync(password, BYCRYPSALT);

    // TODO: Crea El Usuario en MongoDB
    const createdUser = await UserModel.create({
      username: username, password: hashedPassword,
      nombres: nombres, apellidos: apellidos, documento: documento
    });

    //TODO: Una Vez Crea El Usuario Le Asigna Un TOKEN
    jwt.sign({ userId: createdUser._id, username, nombres, apellidos }, JWT_SECRECT, {}, (err, token) => {
      if (err) { throw err }
      else {
        res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
          id: createdUser._id, username, nombres, apellidos
        })
      }
    })
  } catch (error) {
    res.status(500).json('Usuario Ya Existe')
  }

});

app.listen(PORT, () => {
  console.log("Server Running On Port http://localhost:" + PORT)
});