import { ObjectId } from "mongodb";

export interface WishlistDocument {
  _id?: ObjectId;
  userId: string;
  itemId: string;
  createdAt: Date;
}
