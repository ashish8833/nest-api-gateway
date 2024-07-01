import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('api-gateway', (): Record<string, any> => {
  const values = {
    name: 'API-GATEWAY',
    port: parseInt(process.env.API_GATE_WAY_PORT),
    globalPrefix: '/api',
    nodeEnv: process.env.API_GATE_WAY_ENV,
    swaggerDocument: process.env.API_GATE_WAY_SWAGGER_DOC === 'true' || false,
  };

  const schema = Joi.object({
    name: Joi.string().required(),
    port: Joi.number().required(),
    globalPrefix: Joi.string().required(),
    nodeEnv: Joi.string()
      .required()
      .valid('development', 'quality', 'staging', 'production'),
    swaggerDocument: Joi.boolean().required(),
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
