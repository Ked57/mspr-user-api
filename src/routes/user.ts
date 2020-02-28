import { ServerRoute } from "@hapi/hapi";
import of from "await-of";
import { PrismaClient } from "@prisma/client";
import { notFound, badRequest, internal } from "@hapi/boom";
import { userModel } from "../models/user";
import { errorModel } from "../models/error";
import Joi from "@hapi/joi";

export const initUsersRoute = (prisma: PrismaClient): ServerRoute[] => [
  {
    method: "GET",
    path: "/user/{id}",
    options: {
      handler: async (request, h) => {
        const id = request.params.id;
        if (!id) {
          console.error("no id provided");
          return badRequest("no id provided");
        }
        const [res, err] = await of(
          prisma.user.findOne({
            where: {
              auth_id: request.params.id
            }
          })
        );
        if (err) {
          console.error(err);
          return internal(
            `Error: { name : ${err.name} message: ${err.message} }`
          );
        }
        if (!res) {
          return notFound("wrong id provided");
        }
        return res;
      },
      description: "Get a user",
      notes: "Returns an user item by the id passed in the path",
      tags: ["api"],
      validate: {
        params: {
          schema: Joi.string().required()
        }
      },
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
