import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('database', (): Record<string, any> => {
  const values = {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGS,
  };

  const schema = Joi.object({
    name: Joi.string().required(),
    host: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    port: Joi.string().required(),
    dialect: Joi.string().required(),
    logging: Joi.string().required(),
  });

  const { error } = schema.validate(values, { abortEarly: false });

  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing?
        ${error.message}`
    );
  }

  return values;
});
