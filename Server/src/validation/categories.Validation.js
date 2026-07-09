import Joi from "joi";

const catRegex = /^[A-Za-z\s]{3,150}$/;

const categoriesSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .max(150)
    .pattern(catRegex)
    .messages({
      "string.empty": "category can't be empty",
      "string.min": "category must be at least 3 letters",
      "string.max": "category must be at most 150 letters",
      "any.required": "category can't be null",
      "string.pattern.base": "category must contain letters only"
    }),
});

export default categoriesSchema;