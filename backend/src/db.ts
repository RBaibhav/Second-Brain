import { Types } from "mongoose";
import mongoose  from "mongoose";


const userSchema = new mongoose.Schema({
  username: {string: true, required: true, unique: true},
  password: {string: true, required: true},
});

const contentType = ['image', 'video', 'audio', 'text'];

const contentSchema = new mongoose.Schema({
  link: {string: true, required: true},
  title: {string: true, required: true},
  type: {type: String, enum: contentType, required: true},
  tags: [{type: Types.ObjectId, ref: 'Tag'}],
  userId: {type: Types.ObjectId, ref: 'User'},
});

const tagSchema = new mongoose.Schema({
  title: {string: true, required: true, unique: true},
});

const linkSchema = new mongoose.Schema({  
  hash: {string: true, required: true },
  userId: {type: Types.ObjectId, ref: 'User'},
});

const User = mongoose.model('User', userSchema);
const Content = mongoose.model('Content', contentSchema);
const Tag = mongoose.model('Tag', tagSchema);
const Link = mongoose.model('Link', linkSchema);  

export { User, Content, Tag, Link };