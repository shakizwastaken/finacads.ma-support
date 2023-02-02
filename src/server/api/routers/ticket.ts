import { Ticket } from "@prisma/client";
import { TRPCError } from "@trpc/server";
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
});

export default ticketRouter;
