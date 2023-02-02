import { User } from "@prisma/client";
import { prisma } from "../server/db";
import mailer from "@/lib/mailer";
import crypto from "crypto";
import { env } from "@/env/server.mjs";

//returns true if success and false if failed to send
export const sendOtp = async (to: string, code: string): Promise<boolean> => {
  //send otp code to user

  try {
    let res = await mailer.sendMail({
      html: `
      <html>
        <h1>${code}</h1>
      </html>`,
      to,
      from: env.SMTP_FROM,
    });
  } catch (err) {
    if (err) {
      console.log(err);
      return false;
    }
  }

  return true;
};

export const generateOtp = async (user: User) => {
  //clear all past otpRecords
  let pastRecords = await prisma.otpRecord.deleteMany({
    where: {
      userId: user.id,
    },
  });

  //generate random code
  let code = crypto.randomInt(0, 1000000);

  console.log(code);

  //create record
  if (!code) throw new Error("Failed to create otp");

  //create record
  let otpRecord = await prisma.otpRecord.create({
    data: {
      userId: user.id,
      code: code.toString(),
    },
  });

  //failed to create record
  if (!otpRecord) throw new Error("Failed to create otp");

  //send otp by email
  let status: boolean = await sendOtp(user.email, otpRecord.code);

  //failed to send email
  if (!status) {
    await prisma.otpRecord.delete({
      where: {
        id: otpRecord.id,
      },
    });

    throw new Error("Failed to send email");
  }

  //return record
  return otpRecord;
};

export const getOtpExpirationDate = (createdAt: Date) => {
  let newDate = new Date(createdAt);
  newDate.setHours(createdAt.getHours() + 1);
  return newDate;
};

export const isExpiredOtp = (createdAt: Date) => {
  return getOtpExpirationDate(createdAt) < new Date();
};
