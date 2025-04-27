import { Types } from "mongoose";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const contentType = ["image", "video", "audio", "text"];

const contentSchema = new mongoose.Schema({
  link: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: contentType, required: true },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "User" },
});

const tagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
});

const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Content = mongoose.model("Content", contentSchema);
const Tag = mongoose.model("Tag", tagSchema);
const Link = mongoose.model("Link", linkSchema);

export { User, Content, Tag, Link };
