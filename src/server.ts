import fastify from "fastify";
import swagger from "fastify-swagger";

export const initializeServer = (schema: { [key: string]: any }) => {
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
      definitions: schema.definitions,
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

  server.listen(3000, "0.0.0.0", (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    server.log.info(`server listening on ${address}`);
  });
  return server;
};
