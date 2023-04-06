import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl)

const app = express()
const PORT = 4000

app.get('/test', (req, res) => {
  res.json('test ok')
})

app.post('/register', (req, res) => {

})

app.listen(PORT, () => {
  console.log("Server Running Port On http://localhost:" + PORT)
})