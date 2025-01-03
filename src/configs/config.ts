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
};

export default config;
