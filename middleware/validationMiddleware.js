const Joi = require("joi");

const registerValidation = (data) => {
  const Schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    positionTitle: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return Schema.validate(data);
};

const accessValidation = (data) => {
  const Schema = Joi.object({
    accessCode: Joi.string().required()
  });
  return Schema.validate(data);
};

const loginValidation = (data) => {
  const Schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    // accessCode: Joi.string().min(6).required()

  });
  return Schema.validate(data);
};



module.exports = {
  registerValidation,
  loginValidation,
  accessValidation
};
