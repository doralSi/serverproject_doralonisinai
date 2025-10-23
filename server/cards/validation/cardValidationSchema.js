import Joi from "joi";

const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const cardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(0).max(1024).allow(""),
  phone: Joi.string()
    .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
    .rule({ message: 'card "phone" mast be a valid phone number' })
    .required(),
  email: Joi.string()
    .ruleset.pattern(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    )
    .rule({ message: 'card "mail" mast be a valid mail' })
    .required(),

  web: Joi.string().uri().allow(""),

  image: Joi.object()
    .keys({
      url: Joi.string().uri().required(),
      alt: Joi.string().allow(""),
    })
    .required(),
  address: Joi.object()
    .keys({
      state: Joi.string().allow(""),
      country: Joi.string().min(2).max(256).default("Israel"),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
      zip: Joi.alternatives().try(Joi.string(), Joi.number()).default(0),
    })
    .required(),
  bizNumber: Joi.number().allow(""),
  user_id: Joi.string().allow(""),
});

export default cardSchema;
