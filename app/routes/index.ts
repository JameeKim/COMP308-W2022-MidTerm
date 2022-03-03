import { Router, json, urlencoded } from "express";
import methodOverride from "method-override";

import apiRouter from "./api";

export default function rootRouter(): Router {
  const router = Router();

  // Body parsers
  router.use(json(), urlencoded({ extended: true }));

  // Enable PUT and DELETE
  router.use(methodOverride("x-http-method-override"), methodOverride("_method"));

  // API routes
  router.use("/api", apiRouter());

  return router;
}
