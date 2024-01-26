import { Request } from "express";
import { UserType } from "./user.type";

interface JwtPayload {
  name: string;
  iss: string;
  lat: number;
  aud:
    | {
        userId: string;
      }
    | string;
}

interface JwtRequest extends Request {
  payload?: UserType;
}

export type { JwtPayload, JwtRequest };
