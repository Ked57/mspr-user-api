import { ServerRoute } from "@hapi/hapi";
import Joi = require("@hapi/joi");

export const usersRoute: ServerRoute = {
    method: 'GET',
    path: '/api/users',
    options: {
        handler: (request, h) => {
            return 'Hello World!';
        },
        description: 'Get todo',
        notes: 'Returns a todo item by the id passed in the path',
        tags: ['api'], // ADD THIS TAG
        validate: {}
    },
}