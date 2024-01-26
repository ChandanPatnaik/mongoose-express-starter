import { config } from "dotenv";
config();

const configs = {
  DATABASE_URL: process.env.DATABASE_URL!,
  PORT: +(process.env.PORT || 8080),
  API_VERSION: `/api/v1`,
  HOST: `${process.env.HOST}`,
  JWT_SECRET: `${process.env.JWT_SECRET}`,
};

export { configs };
