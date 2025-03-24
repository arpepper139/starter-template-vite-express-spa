import express, {Request, Response} from "express";
import dotenv from "dotenv";
import cors from "cors";

import type {ExampleApiResponse} from 'api-types';

dotenv.config();

const app = express();
const port = process.env.PORT;

const allowedOrigins: string[] = ['http://localhost:5173'];

// Enable CORS for all requests from allowed domains
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

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api", (req: Request, res: Response<ExampleApiResponse>) => {
  // res.status(500).json({error: 'Bad Request'});
  res.json({'access': 'allowed'});
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
