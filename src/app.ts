import express, { Express } from "express";

const app: Express = express();

app.use(express.json());

app.get("/api/v1/health", (_req, res) => {
    res.status(200).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default app;