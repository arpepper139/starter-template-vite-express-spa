import { Router, Request, Response } from "express";
import testRoutes from "./test.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

// e.g. /api/users
router.use("/users", userRoutes); 

// e.g. /api/test
router.use("/test", testRoutes);

export default router;