import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "3000",
  // TO DO -- swap to project specific database
  DATABASE_URL: process.env.DATABASE_URL || "postgres://apepperanderson:apadb@localhost:5432/postgres",
  NODE_ENV: process.env.NODE_ENV || "dev",
};