import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("campus_cart_db");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
  session: {
    cookieCache: {
      enabled: false,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        input: false,
      },
      university: {
        type: "string",
        required: false,
      },
      rating: {
        type: "number",
        defaultValue: 0,
        input: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      avatarUrl: {
        type: "string",
        required: false,
      },
    },
  },
});
