import { ServerRoute } from "@hapi/hapi";
import { errorModel } from "../models/error";
import {
  
} from "../handlers/userHandler";
import { healthHandler } from "../handlers/healthHandler";
import { healthModel } from "../models/health";

export const initHealthRoute = (): ServerRoute[] => [
  {
    method: "GET",
    path: "/health",
    options: {
      handler: async () =>
        healthHandler(),
      description: "Get the API health",
      notes: "Returns the API health",
      tags: ["api"],
      response: {
        status: {
          200: healthModel,
          404: errorModel,
          500: errorModel
        },
        failAction: "log"
      }
    }
  }
];
