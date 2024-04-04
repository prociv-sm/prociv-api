import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  APP_PORT: Joi.number().default(8080).required(),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.string().default('1d').required(),
  CORS_ORIGIN: Joi.string().default('*'),
  ALERT_API_URL: Joi.string().required(),
});
