import Joi from "joi";

const cardSchema = {
  title: Joi.string().min(2).max(255).required(),
  subtitle: Joi.string().min(2).max(255).required(),
  description: Joi.string().allow(""),
  phone: Joi.string().min(7).max(20).required(),
  email: Joi.string().email({ tlds: false }).required(),
  web: Joi.string().uri().allow(""),
  image: Joi.string().uri().required(),
  alt: Joi.string().allow(""),
  city: Joi.string().required(),
  street: Joi.string().required(),
  houseNumber: Joi.string().required(),
};

export default cardSchema;
