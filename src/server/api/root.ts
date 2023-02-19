import authRouter from "./routers/auth";
import organizationRouter from "./routers/organization";
import ticketRouter from "./routers/ticket";
import userRouter from "./routers/user";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  ticket: ticketRouter,
  organization: organizationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
