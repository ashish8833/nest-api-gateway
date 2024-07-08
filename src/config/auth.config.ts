import { registerAs } from '@nestjs/config';
import { seconds } from 'src/common/helper/constants/helper.function.constant';
import * as Joi from 'joi';

export default registerAs('auth', (): Record<string, any> => {
  const values = {
    accessToken: {
      secretKey: process.env.AUTH_JWT_ACCESS_TOKEN_SECRET_KEY,
      expirationTime: seconds(process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED), // 1 hours
      notBeforeExpirationTime: seconds('0'), // immediately
      encryptKey: process.env.AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY,
      encryptIv: process.env.AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV,
    },
    refreshToken: {
      secretKey:
        process.env.AUTH_JWT_REFRESH_TOKEN_SECRET_KEY,
      expirationTime: seconds(
        process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRED
      ),
      notBeforeExpirationTime: seconds('0'), // immediately
      encryptKey: process.env.AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY,
      encryptIv: process.env.AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV,
    },
    subject: process.env.AUTH_JWT_SUBJECT,
    audience: process.env.AUTH_JWT_AUDIENCE,
    issuer: process.env.AUTH_JWT_ISSUER,


    // prefixAuthorization: 'Bearer',
    // payloadEncryption:
    //     process.env.AUTH_JWT_PAYLOAD_ENCRYPT === 'true' ? true : false,
    // password: {
    //     attempt: true,
    //     maxAttempt: 5,
    //     saltLength: 6,
    //     expiredIn: seconds('182d'), // 182 days
    // },
  };

  const schema = Joi.object({
    accessToken: Joi.object({
      secretKey: Joi.string().required(),
      expirationTime: Joi.number().positive().required(),
      notBeforeExpirationTime: Joi.number().min(0).required(),
      encryptKey: Joi.string().required(),
      encryptIv: Joi.string().required(),
    }).required(),
    refreshToken: Joi.object({
      secretKey: Joi.string().required(),
      expirationTime: Joi.number().positive().required(),
      notBeforeExpirationTime: Joi.number().min(0).required(),
      encryptKey: Joi.string().required(),
      encryptIv: Joi.string().required(),
    }).required(),
    subject: Joi.string().required(),
    audience: Joi.string().required(),
    issuer: Joi.string().required(),
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
