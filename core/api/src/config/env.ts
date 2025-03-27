import dotenv from "dotenv";

dotenv.config();

// REMEMBER TO CHANGE ENV VALUE TOO IF YOU'RE UPDATING THIS FILE
export const env = {
  PORT: process.env.PORT || "3000",
  // swap to project specific database
  DATABASE_URL: process.env.DATABASE_URL || "postgres://apepperanderson:apadb@localhost:5432/exampledatabase",
  NODE_ENV: process.env.NODE_ENV || "dev",
};