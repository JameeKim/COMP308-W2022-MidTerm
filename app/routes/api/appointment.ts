import { Router } from "express";

import * as appointments from "../../controllers/appointment";

export default function appointment(): Router {
  const router = Router();

  router.route("/")
    /**
     * GET /api/appointments - Get all appointments
     */
    .get(async (_req, res) => {
      const list = await appointments.getAll();
      res.send({ data: list });
    })
    /**
     * POST /api/appointments - Create an appointment
     */
    .post(async (req, res) => {
      const result = await appointments.addOne(req.body);
      if (result) {
        res.status(400).send({ error: "bad_data", message: result });
      } else {
        res.sendStatus(201);
      }
    });

  router.route("/:id")
    /**
     * DELETE /api/appointments/:id - Delete the appointment with the id
     */
    .delete(async (req, res) => {
      const id = req.params.id;
      const result = await appointments.deleteOne(id);
      res.sendStatus(result ? 200 : 404);
    });

  return router;
}
