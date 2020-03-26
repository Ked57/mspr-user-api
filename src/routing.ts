import { PrismaClient } from "@prisma/client";
import { initUsersRoute } from "./routes/user";
import { initHealthRoute } from "./routes/health";

export const initRoutes = (prisma: PrismaClient) => {
  return [...initUsersRoute(prisma), ...initHealthRoute()];
};
