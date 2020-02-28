import Joi = require("@hapi/joi");

export const userModel = Joi.object({
    auth_id: Joi.string().required(),
    user_name: Joi.string().required()
  }).label("User");