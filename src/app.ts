import "express-async-errors";
import express, { Application } from "express";
import "dotenv/config";
import { developersRouter, projectRouter } from "./routers";
import { handleError } from "./middlewares";

const app: Application = express();

app.use(express.json());

app.use("/developers", developersRouter);

app.use("/projects", projectRouter);

app.use(handleError);

export default app;
