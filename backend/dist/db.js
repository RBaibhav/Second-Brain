"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.Tag = exports.Content = exports.User = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
mongoose_2.default.connect(DATABASE_URL);
const userSchema = new mongoose_2.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const contentType = ["image", "video", "audio", "text"];
const contentSchema = new mongoose_2.default.Schema({
    link: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, enum: contentType, required: true },
    tags: [{ type: mongoose_1.Types.ObjectId, ref: "Tag" }],
    userId: { type: mongoose_1.Types.ObjectId, ref: "User" },
});
const tagSchema = new mongoose_2.default.Schema({
    title: { type: String, required: true, unique: true },
});
const linkSchema = new mongoose_2.default.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.Types.ObjectId, ref: "User" },
});
const User = mongoose_2.default.model("User", userSchema);
exports.User = User;
const Content = mongoose_2.default.model("Content", contentSchema);
exports.Content = Content;
const Tag = mongoose_2.default.model("Tag", tagSchema);
exports.Tag = Tag;
const Link = mongoose_2.default.model("Link", linkSchema);
exports.Link = Link;
