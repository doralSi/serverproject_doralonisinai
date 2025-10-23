import dotenv from "dotenv";
dotenv.config();

import express from "express";
import logger from "./middlewares/logger.js";
import router from "./router/router.js";
import cors from "cors";
import { connectToDb } from "./DB/dbService.js";
import chalk from "chalk";

import serverLogger from "./middlewares/loggerService.js";
import { fileLogger } from "./middlewares/fileLogger.js";
const app = express(); //איתחול אפליקציית אקספרס חדשה
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5173"],
  })
);

app.use(express.json());
app.use(serverLogger);

app.use(express.static("./public"));
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(router);

// File logger for errors (status 400+)
app.use((err, req, res, next) => {
  if (err && err.status >= 400) {
    fileLogger(err.status, err.message || JSON.stringify(err));
  }
  next(err);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send("Server Internal Error");
});

app.listen(port, () => {
  console.log(chalk.blueBright(`Listening on: http://localhost:${port}`));
  connectToDb();
});
