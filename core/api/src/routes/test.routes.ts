import { Router, Request, Response } from "express";
import type { CustomMessage } from "api-types";

const router = Router();

router.get("/", (req: Request, res: Response<CustomMessage>) => {
  res.json({ message: "API up and running!" });
});

export default router;
