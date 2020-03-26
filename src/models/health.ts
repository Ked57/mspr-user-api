import Joi = require("@hapi/joi");

export const healthModel = Joi.object({
  status: Joi.allow("UP", "DOWN").required()
}).label("Health");
