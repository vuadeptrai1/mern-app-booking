import * as dotenv from "dotenv";
import Joi from "joi";

const result = dotenv.config();

const envVarSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    MONGODB_CONNECTION_STRING: Joi.string()
      .required()
      .description("Mongo DB url"),
    SMTP_HOST: Joi.string().description("server that will send the emails"),
    SMTP_PORT: Joi.number().description("port to connect to the email server"),
    SMTP_USERNAME: Joi.string().description("username for email server"),
    SMTP_PASSWORD: Joi.string().description("password for email server"),
    EMAIL_FROM: Joi.string().description(
      "the from field in the emails sent by the app"
    ),
  })
  .unknown();

const { value: envSchema, error } = envVarSchema
  .prefs({ errors: { label: "key" } })
  .validate(result.parsed);

if (error) {
  throw new Error(`Config validation error`);
}

const config = {
  env: envSchema.NODE_ENV,
  port: envSchema.PORT,
  jwt: {
    accessExpirationMinutes: envSchema.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envSchema.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envSchema.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    secret: envSchema.JWT_SECRET,
    verifyEmailExpirationMinutes: envSchema.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envSchema.SMTP_HOST,
      port: envSchema.SMTP_PORT,
      auth: {
        user: envSchema.SMTP_USERNAME,
        pass: envSchema.SMTP_PASSWORD,
      },
    },
    from: envSchema.EMAIL_FROM,
  },
};

export default config;
