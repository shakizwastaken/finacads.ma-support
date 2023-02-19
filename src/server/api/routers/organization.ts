import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { Role } from "@prisma/client";

const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().nullish(),
        users: z.array(
          z.object({
            firstName: z.string(),
            lastName: z.string().nullish(),
            email: z.string(),
          })
        ),
      })
    )
    .mutation(
      async ({
        ctx: { user, prisma },
        input: { name, description, users },
      }) => {
        if (!user.roles.includes("ADMIN"))
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Must be admin to perform this action.",
          });

        let processedUsers = users.map((user) => ({
          ...user,
          contactEmail: user.email,
          roles: [Role.CUSTOMER],
          position: "undefined",
        }));

        const organization = await prisma.customer.create({
          data: {
            name,
            description,
            accounts: { createMany: { data: [...processedUsers] } },
          },
        });

        if (!organization)
          throw new TRPCError({
            message: "Something went wrong",
            code: "INTERNAL_SERVER_ERROR",
          });

        return { message: "Successfully created organization", organization };
      }
    ),
  all: protectedProcedure.query(async ({ ctx: { prisma, user } }) => {
    if (!user.roles.includes("ADMIN"))
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Must be admin to perform this action.",
      });

    return await prisma.customer.findMany();
  }),
});

export default organizationRouter;
