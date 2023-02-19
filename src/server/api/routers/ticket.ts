import { Customer, Ticket } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const ticketRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async ({
      ctx: {
        user: { id, roles, customerId },
        prisma,
      },
    }) => {
      let tickets: Ticket[] = [];

      const includeInTicket = {
        customer: true,
        createdBy: true,
      };

      try {
        //admin gets to see all tickets
        if (roles.includes("ADMIN")) {
          tickets = await prisma.ticket.findMany({
            include: includeInTicket,
          });
        } else if (roles.includes("STAFF")) {
          let rawTickets = await prisma.ticketStaff.findMany({
            where: { userId: id },
            include: {
              user: true,
              ticket: {
                include: includeInTicket,
              },
            },
          });

          tickets = rawTickets.map(({ ticket }) => ticket);
        } else if (customerId && roles.includes("CUSTOMER")) {
          tickets = await prisma.ticket.findMany({
            where: {
              customerId: customerId,
            },
            include: includeInTicket,
          });
        }
      } catch (err) {
        throw new TRPCError({
          message: "Internal database error",
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return tickets;
    }
  ),
  getTicket: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { prisma, user }, input: { id } }) => {
      let ticket = await prisma.ticket.findFirst({ where: { id } });

      if (!ticket)
        throw new TRPCError({
          message: "Failed to retrieve ticket",
          code: "INTERNAL_SERVER_ERROR",
        });

      if (
        !user.roles.includes("ADMIN") &&
        !user.roles.includes("STAFF") &&
        user.customerId !== ticket?.customerId
      )
        throw new TRPCError({
          message: "You cannot view this ticket",
          code: "UNAUTHORIZED",
        });

      return ticket;
    }),
  getCustomerOptions: protectedProcedure.query(
    async ({
      ctx: {
        user: { roles, customerId },
        prisma,
      },
    }) => {
      let customers: Customer[] = [];

      if (roles.includes("ADMIN") || roles.includes("STAFF")) {
        customers = await prisma.customer.findMany();
      } else {
        if (customerId)
          customers = await prisma.customer.findMany({
            where: { id: customerId },
          });
      }

      return customers.map(({ name, id }) => ({ label: name, value: id }));
    }
  ),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().nullish(),
        customerId: z.string(),
        labels: z.enum(["URGENT", "ORDER", "ISSUE", "INFO"]),
      })
    )
    .mutation(
      async ({
        ctx: {
          prisma,
          user: { id },
        },
        input: { labels: rawLabels, ...input },
      }) => {
        let labels = [rawLabels];

        let ticket = await prisma.ticket.create({
          data: {
            ...input,
            labels,
            userId: id,
          },
        });

        return { message: "Ticket created successfully", ticket };
      }
    ),

  getConversation: protectedProcedure
    .input(
      z.object({
        ticketId: z.string(),
      })
    )
    .query(
      async ({
        ctx: {
          prisma,
          user: { id: userId },
        },
        input: { ticketId },
      }) => {
        let ticket = await prisma.ticket.findFirst({ where: { id: ticketId } });
        if (!ticket)
          throw new TRPCError({
            message: "Ticket not found.",
            code: "NOT_FOUND",
          });

        let rawMessages = await prisma.message.findMany({
          where: {
            ticketId,
          },
          include: {
            sender: true,
          },
        });

        return rawMessages.map(
          ({ isSystemMessage, senderId, sender, ...message }) => {
            let isSender = !isSystemMessage && senderId === userId;
            return { ...message, sender, isSender, isSystemMessage, senderId };
          }
        );
      }
    ),

  sendUserMessage: protectedProcedure
    .input(z.object({ ticketId: z.string(), content: z.string() }))
    .mutation(
      async ({
        ctx: {
          prisma,
          user: { id: userId },
        },
        input: { ticketId, content },
      }) => {
        let ticket = await prisma.ticket.findFirst({ where: { id: ticketId } });
        if (!ticket)
          throw new TRPCError({
            message: "Ticket not found.",
            code: "NOT_FOUND",
          });

        if (ticket.isClosed)
          throw new TRPCError({
            message: "Cannot send messages in a closed ticket.",
            code: "UNAUTHORIZED",
          });

        let message = await prisma.message.create({
          data: {
            ticketId,
            content,
            senderId: userId,
            isSystemMessage: false,
          },
        });

        if (!message)
          throw new TRPCError({
            message: "Failed to create message",
            code: "INTERNAL_SERVER_ERROR",
          });

        return { message: "Message sent successfully!", messageData: message };
      }
    ),

  sendServerMessage: protectedProcedure.mutation(async () => {}),

  archive: protectedProcedure
    .input(z.object({ ticketId: z.string(), value: z.boolean() }))
    .mutation(async ({ ctx: { prisma, user }, input: { ticketId, value } }) => {
      if (!user.roles.includes("ADMIN") && !user.roles.includes("STAFF")) {
        let customer = await prisma.customer.findFirst({
          where: { id: user.customerId || "" },
          include: { tickets: true },
        });

        if (!customer)
          throw new TRPCError({
            message: "Failed to retrieve data.",
            code: "INTERNAL_SERVER_ERROR",
          });

        if (!customer.tickets.some((ticket) => ticket.id === ticketId))
          throw new TRPCError({
            message: "You do not have enough perms to do this",
            code: "UNAUTHORIZED",
          });
      }

      return await prisma.ticket.update({
        where: { id: ticketId },
        data: { isArchived: value },
      });
    }),

  closed: protectedProcedure
    .input(z.object({ ticketId: z.string(), value: z.boolean() }))
    .mutation(async ({ ctx: { prisma, user }, input: { ticketId, value } }) => {
      if (!user.roles.includes("ADMIN") && !user.roles.includes("STAFF")) {
        let customer = await prisma.customer.findFirst({
          where: { id: user.customerId || "" },
          include: { tickets: true },
        });

        if (!customer)
          throw new TRPCError({
            message: "Failed to retrieve data.",
            code: "INTERNAL_SERVER_ERROR",
          });

        if (!customer.tickets.some((ticket) => ticket.id === ticketId))
          throw new TRPCError({
            message: "You do not have enough perms to do this",
            code: "UNAUTHORIZED",
          });
      }

      return await prisma.ticket.update({
        where: { id: ticketId },
        data: { isArchived: value, isClosed: value, closedById: user.id },
      });
    }),
});

export default ticketRouter;
