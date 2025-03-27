/**
 * Sets up middleware and route registration
 */
import express, {Request, Response, NextFunction} from "express";
import cors from "cors";
import router from "./routes/index.js"
import {pool} from './config/db.js';
import {HttpStatusCode} from "api-types";

const app = express();

// Middleware setup

//// Allows the server to parse incoming JSON
app.use(express.json());

//// Enables CORS for all requests from allowed domains
const allowedOrigins: string[] = ['http://localhost:5173'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(HttpStatusCode.InternalServerError).json({ message: "Something went wrong!" });
});

// Starts server and confirm DB connection
const startServer = async (req: Request, res: Response) => {
  try {
    await pool.query("SELECT 1"); // Quick test query
    console.log("✅ PostgreSQL connected successfully");
    res.send("Express + TypeScript Server");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

app.get("/", startServer);

// Routes
app.use("/api", router)

export default app;
