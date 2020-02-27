import { initializeServer } from "./server";
import { registerRoutes } from "./routes";

const main = async () => {
    const schema = await import("../schema.json");
    const server = initializeServer(schema);
    registerRoutes(server, schema);      
}

main();