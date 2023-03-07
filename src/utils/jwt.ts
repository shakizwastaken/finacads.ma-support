import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { env } from "../env/server.mjs";
import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

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

export const sendToken = async ({
  user,
  req,
  res,
}: {
  user: User;
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const token = new JWTPayload(user).sign();
  if (!token) throw new Error("Failed to sign token");

  //set cookies in header as httpOnly
  setCookie("token", token, { httpOnly: true, req, res });

  //return token string
  return token;
};
