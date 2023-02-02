import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { env } from "../env/server.mjs";
import { NextApiResponse } from "next";
import { User } from "@prisma/client";

export interface JWTPayloadType {
  aud: string;
  sub: string;
  iat: number;
}

export class JWTPayload {
  aud: string;
  sub: string;
  iat: number;

  constructor(user: User) {
    this.sub = user.id;
    this.aud = env.JWT_AUDIENCE;
    this.iat = Math.floor(Date.now() / 1000);
  }

  sign() {
    return jwt.sign(
      { aud: this.aud, sub: this.sub, iat: this.iat },
      env.JWT_SECRET
    );
  }

  public static verify(token: string) {
    return jwt.verify(token, env.JWT_SECRET) as JWTPayloadType;
  }
}

export const sendToken = async (user: User, res: NextApiResponse) => {
  const token = new JWTPayload(user).sign();
  if (!token) throw new Error("Failed to sign token");

  //set cookies in header as httpOnly
  res.setHeader("Set-Cookie", serialize("token", token, { httpOnly: true }));

  //return token string
  return token;
};
