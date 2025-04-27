import express from "express";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post("api/v1/signup", (req, res) => {});

app.post("/api/v1/login", (req, res) => {});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:sharelink", (req, res) => {});