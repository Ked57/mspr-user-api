import { ServerRoute } from "@hapi/hapi";
import { PrismaClient } from "@prisma/client";
import { userModel } from "../models/user";
import { errorModel } from "../models/error";
import { userHandler } from "../handlers/userHandler";

export const initUsersRoute = (prisma: PrismaClient): ServerRoute[] => [
  {
    method: "GET",
    path: "/user/{id}",
    options: {
      handler: async (request, h) =>
        userHandler(request.params.id, prisma.user.findOne as any),
      description: "Get a user",
      notes: "Returns an user item by the id passed in the path",
      tags: ["api"],
      response: {
        status: {
          200: userModel,
          404: errorModel,
          500: errorModel
        },
        failAction: "log"
      }
    }
  }
];
