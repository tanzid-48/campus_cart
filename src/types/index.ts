import { ObjectId } from "mongodb";

export interface WishlistDocument {
  _id?: ObjectId;
  userId: string;
  itemId: string;
  createdAt: Date;
}

export interface UserDocument {
  _id?: ObjectId;
  name: string;
  email: string;
  role: "user" | "admin";
  university?: string;
  rating?: number;
  phone?: string;
  avatarUrl?: string;
  createdAt: Date;
}