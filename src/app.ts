import fastify from "fastify";
import swagger from "fastify-swagger";

const server = fastify({
  logger: true
});

server.register(swagger, {
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "Test swagger",
      description: "testing the fastify swagger api",
      version: "0.1.0"
    },
    // externalDocs: {
    //   url: "https://swagger.io",
    //   description: "Find more info here"
    // },
    host: "0.0.0.0:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "user", description: "User related end-points" }],
    definitions: {
      User: {
        $id: "User",
        type: "object",
        required: ["id", "email"],
        properties: {
          id: { type: "string", format: "uuid" },
          auth_id: { type: "string" },
          firstName: { type: "string", nullable: true },
          lastName: { type: "string", nullable: true },
          email: { type: "string", format: "email" }
        }
      }
    },
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "apiKey",
        in: "header"
      }
    }
  },
  exposeRoute: true
});

server.get(
  "/",
  {
    schema: {
      description: "Get a user",
      tags: ["user"],
      summary: "Get a user",
      params: {
        type: "object",
        properties: {
          auth_id: {
            type: "string",
            description: "auth id"
          }
        }
      },
      body: {
        type: "object",
        properties: {
          hello: { type: "string" },
          obj: {
            type: "object",
            properties: {
              some: { type: "string" }
            }
          }
        }
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            hello: { type: "string" }
          }
        }
      },
      security: [
        {
          apiKey: []
        }
      ]
    }
  },
  (request, reply) => {
    reply.send({ hello: "world" });
  }
);

server.listen(3000, "0.0.0.0", (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
