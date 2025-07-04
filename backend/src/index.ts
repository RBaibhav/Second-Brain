import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Content, Link, User } from "./db";
import { auth } from "./middleware";

import * as dotenv from "dotenv";
import { random } from "./utils";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const SALT = parseInt(process.env.SALT);
const JWT_SECRET = process.env.JWT_SECRET;

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

app.post("/api/v1/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  const user = await User.findOne({
    username: username,
  });

  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(400).json({ message: "Invalid password" });
    return;
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.status(200).json({ token: token });
  return;
});

app.post("/api/v1/contents", auth, async (req, res) => {
  const { link, title, type, tags } = req.body;
  const userId = req.userId;

  if (!link || !title || !type) {
    res.status(400).json({ message: "Link, title and type are required" });
    return;
  }
  const content = new Content({
    link: link,
    title: title,
    type: type,
    tags: tags,
    userId: userId,
  });

  await Content.create(content);
  res.status(201).json({ message: "Content created successfully" });
  return;
});

app.get("/api/v1/content", auth, async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }
  const content = await Content.find({ userId: userId }).populate(
    "userId",
    "username"
  );

  res.json({
    content,
  });
});

app.delete("/api/v1/content", auth, async (req, res) => {
  const userId = req.userId;
  const contentId = req.body.contentId;

  if (!contentId) {
    res.status(400).json({
      message: "Content ID required",
    });
    return;
  }

  const deletedContent = await Content.findOneAndDelete({
    _id: contentId,
    userId: userId,
  });

  if (!deletedContent) {
    res.status(403).json({
      message: "Content not found",
    });
  }
  res.status(200).json({
    message: "successfully deleted",
  });
});

app.post("/api/v1/brain/share", auth, async (req, res) => {
  const share = req.body.share;

  if (share) {
    const existingLink = await Link.findOne({
      userId: req.userId,
    });
    if (existingLink) {
      res.status(400).json({
        message: "Share link already exists",
      });
      return;
    }
    const hash = random(10);

    await Link.create({
      hash: hash,
      userId: req.userId,
    });
    res.status(201).json({
      message: "Share link created successfully",
      shareLink: `${req.protocol}://${req.get("host")}/api/v1/brain/${hash}`,
    });
    return;
  } else {
    await Link.deleteOne({
      userId: req.userId,
    });
    res.status(200).json({
      message: "Share link deleted successfully",
    });
    return;
  }
});

app.get("/api/v1/brain/:sharelink", async (req, res) => {
  const hash = req.params.sharelink;

  const link = await Link.findOne({
    hash,
  });

  if (!link) {
    res.status(404).json({
      message: "Share link not found",
    });
    return;
  }

  const content = await Content.find({
    userId: link.userId,
  });
  
  const user = await User.findOne({
    _id: link.userId,
  })
  
  if(!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  res.status(200).json({
    user: {
      username: user.username,
    },
    content,
  });
  return;
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
