import { RequestHandler, Router } from "express";

const noCache: RequestHandler = (_req, res, next) => {
  res.set("cache-control", "no-store");
  next();
};

export default function apiRouter(): Router {
  const router = Router();

  // Disable caching
  router.use(noCache);

  router.get("/hello", (_req, res) => {
    res.send({ data: "Hi" });
  });

  // TODO

  return router;
}
