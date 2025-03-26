import pg from 'pg'
import { env } from "./env.js";

// Note import {Pool} from 'pg' throws an error since 
// pg is a CommonJS module. This approach works.
const {Pool} = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});