const Joi = require("joi");
const personSchema = require("../schema/person_schema");

const validatePersonSchema = (req, res, next) => {
  const { error } = personSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validatePersonSchema;
