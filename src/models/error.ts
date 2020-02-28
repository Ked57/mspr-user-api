import Joi = require("@hapi/joi");

export const errorModel = Joi.object({
  name: Joi.string().required(),
  message: Joi.string().required()
}).label("Error");
