import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  action: {
    forgotPasswordSecret: process.env.ACTION_FORGOT_PASSWORD_SECRET,
    forgotPasswordExpiresIn: process.env.ACTION_FORGOT_PASSWORD_EXPIRES_IN,
    emailVerificationSecret: process.env.ACTION_EMAIL_VERIFICATION_SECRET,
    emailVerificationExpiresIn:
      process.env.ACTION_EMAIL_VERIFICATION_EXPIRES_IN,
  },

  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
  frontUrl: process.env.FRONT_URL,
};

export default config;
