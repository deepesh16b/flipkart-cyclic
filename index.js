import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
// import { v4 as uuid } from "uuid";
import Connection from "./database/db.js";
import DefaultData from "./default.js";
import Route from "./routes/route.js";
import path from 'path';
import { fileURLToPath } from "url";

// esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.join(__dirname, './client/build')))
app.use("*",function(req, res){
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})
app.use(express.urlencoded({ extended: true }));
const PORT = 8000;

const user = process.env.USER_NAME;
const password = process.env.USER_PASSWORD;

Connection(user, password);

app.listen(PORT || process.env.PORT);

DefaultData();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Route);

app.get("/getKey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});
