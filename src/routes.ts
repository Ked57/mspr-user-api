import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

export const registerRoutes = (
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  schema: { [key: string]: any }
) => {
  server.get(
    "/user",
    {
      ...schema.routes["/user"]
    },
    (request, reply) => {
      reply.send({ hello: "world" });
    }
  );
};
