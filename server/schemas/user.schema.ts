import { Model, Schema, model } from "mongoose";
import { UserType } from "../types/user.type";

const userSchema = new Schema<UserType, Model<UserType>>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email must be provided"],
      unique: true,
    },
    role: {
      enum: ["ADMIN", "USER"],
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: String,
    avatarPath: String,
    emailVerified: {
      type: Boolean,
      default: false,
    },
    isOnline: Boolean,
    isBlocked: Boolean,
    lastLogin: Date,
    fcmTokens: {
      web: String,
      android: String,
      ios: String,
    },
  },
  {
    timestamps: true,
  }
);

export const UserSchema = model<UserType, Model<UserType>>(
  "Users",
  userSchema,
  "Users"
);
