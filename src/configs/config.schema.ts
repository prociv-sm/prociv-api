import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  APP_PORT: Joi.number().default(8080).required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(5432).required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().default('').required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.string().default('1d').required(),
  CORS_ORIGIN: Joi.string().default('*'),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379).required(),
  REDIS_USERNAME: Joi.string().default('default').required(),
  REDIS_PASSWORD: Joi.string().default('').required(),
});
