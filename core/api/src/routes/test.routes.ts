import { Router, Request, Response } from "express";
import type {ExampleApiResponse} from 'api-types';

const router = Router();

router.get("/", (req: Request, res: Response<ExampleApiResponse>) => {
  res.json({access: "allowed"});
})

export default router;