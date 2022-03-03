/**
 * Entry point for express backend process
 */

import express from "express";
import morgan from "morgan";

import { initConfig } from "./config/env";

initConfig();

// Express application
const app = express();
app.disable("x-powered-by");

// Logging
app.use(morgan("dev"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
