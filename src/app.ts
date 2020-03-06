import * as Hapi from "@hapi/hapi";
import * as HapiSwagger from "hapi-swagger";
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import { initRoutes } from "./routing";
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || "3000";

export const main = async (port: string) => {
  const server = await new Hapi.Server({
    host: "0.0.0.0",
    port
  });
  const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: "Test API Documentation"
    }
  };

  const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
    {
      plugin: Inert
    },
    {
      plugin: Vision
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ];
  const prisma = new PrismaClient();
  const routes = initRoutes(prisma);
  await server.register(plugins);
  await server.route(routes);

  try {
    await server.start();
    console.log("Server running at:", server.info.uri);
  } catch (err) {
    console.log("Couldn't start server: ", err);
  }
  return { app: server, address: server.info.uri };
};

main(PORT);
