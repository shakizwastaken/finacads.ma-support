import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const userRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        customerId: z.string(),
        firstName: z.string(),
        lastName: z.string().nullish(),
        email: z.string(),
        displayNumber: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx: { prisma, user }, input }) => {
      if (!user.roles.includes("ADMIN") && user.customerId !== input.customerId)
        throw new TRPCError({
          message: "You cannot perform this action",
          code: "UNAUTHORIZED",
        });

      let processedData = { ...input };

      const createdUser = await prisma.user.create({
        data: { ...processedData },
      });

      if (!createdUser)
        throw new TRPCError({
          message: "Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });

      return {
        message: "successfully added user to database",
        user: createdUser,
      };
    }),
  all: protectedProcedure.query(async ({ ctx: { prisma, user } }) => {
    if (!user.roles.includes("ADMIN"))
      throw new TRPCError({
        message: "You cannot perform this action",
        code: "UNAUTHORIZED",
      });
    return await prisma.user.findMany();
  }),

  toggle: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { prisma, user }, input: { id } }) => {
      if (!user.roles.includes("ADMIN"))
        throw new TRPCError({
          message: "You cannot perform this action",
          code: "UNAUTHORIZED",
        });

      let target = await prisma.user.findFirst({ where: { id } });

      if (!target)
        throw new TRPCError({ message: "User not found", code: "NOT_FOUND" });

      return await prisma.user.update({
        where: { id },
        data: { disabled: !target.disabled },
      });
    }),
});

export default userRouter;
