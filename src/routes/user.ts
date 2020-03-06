import { ServerRoute } from "@hapi/hapi";
import { PrismaClient } from "@prisma/client";
import { userModel } from "../models/user";
import { errorModel } from "../models/error";
import { userHandler, putUserHandler, postUserHandler } from "../handlers/userHandler";
import { parse } from "../utils/parse";

export const initUsersRoute = (prisma: PrismaClient): ServerRoute[] => [
  {
    method: "GET",
    path: "/user/{id}",
    options: {
      handler: async request =>
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
  },
  {
    method: "PUT",
    path: "/user",
    options: {
      handler: async (request, h) =>
        putUserHandler(h, parse(request.payload), prisma.user.create as any),
      description: "Create a user",
      notes: "Creates an user given a correct payload",
      tags: ["api"],
      response: {
        status: {
          201: userModel,
          400: errorModel,
          500: errorModel
        },
        failAction: "log"
      }
    }
  },
  {
    method: "POST",
    path: "/user",
    options: {
      handler: async (request, h) =>
        postUserHandler(h, parse(request.payload), prisma.user.update as any),
      description: "Update a user",
      notes: "Updates an user given a correct payload",
      tags: ["api"],
      response: {
        status: {
          200: userModel,
          400: errorModel,
          500: errorModel
        },
        failAction: "log"
      }
    }
  }
];
