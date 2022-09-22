import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  APP_PORT: Joi.number().default(3000).required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(5432).required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().default('').required(),
});
