import { Document } from "mongoose";

export interface UserType extends Document {
  name: string;
  email: string;
  avatar: string;
  avatarPath: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: "ADMIN" | "USER";
  isBlocked: boolean;
  password: string;
  salt: string;
  fcmTokens: {
    web: string;
    android: string;
    ios: string;
  };
  isOnline: boolean;
  lastLogin: Date;
}
