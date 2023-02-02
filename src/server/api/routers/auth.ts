import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { generateOtp, isExpiredOtp } from "@/utils/auth";
import { JWTPayload, sendToken } from "@/utils/jwt";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const authRouter = createTRPCRouter({
  requestOtp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        stayLoggedIn: z.boolean().nullish(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { email } }) => {
      //get user from email
      let user = await prisma.user.findFirst({ where: { email } });

      //user not found
      if (!user)
        throw new TRPCError({
          message: "User with provided credentials not found",
          code: "NOT_FOUND",
        });

      //send otp email and create new otp record
      try {
        await generateOtp(user);
      } catch (err: any) {
        throw new TRPCError({
          message: err?.message || "Something went wrong when generating otp",
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return { message: "Otp sent successfully" };
    }),
  verifyOtp: publicProcedure
    .input(z.object({ code: z.string() }))
    .mutation(async ({ ctx: { prisma, res }, input: { code } }) => {
      let otpRecord = await prisma.otpRecord.findFirst({ where: { code } });

      if (!otpRecord)
        throw new TRPCError({
          message: "Invalid code",
          code: "UNAUTHORIZED",
        });

      if (isExpiredOtp(otpRecord.createdAt)) {
        //delete the otp record from db
        await prisma.otpRecord.delete({ where: { id: otpRecord.id } });

        throw new TRPCError({
          message: "OTP is expired",
          code: "UNAUTHORIZED",
        });
      }

      //delete the otp record from db
      await prisma.otpRecord.delete({ where: { id: otpRecord.id } });

      let user = await prisma.user.findFirst({
        where: { id: otpRecord.userId },
      });

      console.log("got here");

      if (!user)
        throw new TRPCError({
          message: "Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });

      let token = sendToken(user, res);

      return { user, token };
    }),

  getUser: protectedProcedure.mutation(async ({ ctx: { user } }) => {
    return { user };
  }),
});

export default authRouter;
