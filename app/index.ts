/**
 * Entry point for express backend process
 */

import express from "express";
import morgan from "morgan";

import { initDatabase } from "./config/databse";
import { initConfig } from "./config/env";
import rootRouter from "./routes";

// Get config values
initConfig();

// Connect to database
initDatabase();

// Express application
const app = express();
app.disable("x-powered-by");

// Logging
app.use(morgan("dev"));

// Routes
app.use(rootRouter());

// Start listening to requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
