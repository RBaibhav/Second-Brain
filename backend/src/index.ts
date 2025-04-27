import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import * as dotenv from "dotenv";
import { User } from "./db";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const SALT = parseInt(process.env.SALT);

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;
    
  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }
  const checkUser = await User.findOne({
    username: username,
  });
  if (checkUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, SALT);

  const newUser = new User({
    username: username,
    password: hashedPassword,
  });
  await User.create(newUser);
  res.status(201).json({ message: "User created successfully" });
  return;
});

app.post("/api/v1/login", (req, res) => {});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:sharelink", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
