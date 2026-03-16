import express, { Express, Request, Response } from "express";
import loanRoutes from "./api/v1/routes/loanRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";

const app: Express = express();

if (process.env.NODE_ENV === "production") {
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    app.use(consoleLogger);
}

app.use(express.json());

app.get("/api/v1/health", (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "High-Risk Loan Application Monitoring System API is running",
        timestamp: new Date().toISOString(),
    });
});

app.use("/api/v1", loanRoutes);

app.use(errorHandler);

export default app;