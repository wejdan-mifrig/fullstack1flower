import Joi from "joi";

const catRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9\s]{3,150}$/;

const menuSchema = Joi.object({
  name: Joi.string().required().min(3).max(150).pattern(catRegex).messages({
    "string.min": "menu item must be at least 3 letters",
    "string.max": "menu item must be at most 150 letters",
    "any.required": "menu item cant be null",
    "string.pattern.base": "menu must be only valid letters",
  }),
  description: Joi.string().optional().min(3).max(500),
  image: Joi.string().optional(),
  category_id: Joi.number().integer().required().messages({
    "any.required": "category is required",
    "number.base": "category_id must be a number",
  }),
});

export default menuSchema;