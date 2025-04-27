import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET;

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

  if (!decoded) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  req.userId = decoded.id;
  next();
};
