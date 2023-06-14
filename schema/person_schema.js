const Joi = require("joi");

const person_schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().integer().min(0).required(),
      hobbies: Joi.array().required(),
    });


module.exports = person_schema;