import { PrismaClient } from "@prisma/client";
import { initUsersRoute } from "./routes/user";

export const initRoutes = (prisma: PrismaClient) => {
  return [...initUsersRoute(prisma)];
};
