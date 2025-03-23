import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

const allowedOrigins = ['http://localhost:5173'];

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

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.get("/api", (req, res) => {
  res.send(JSON.stringify({'access': 'allowed'}));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
