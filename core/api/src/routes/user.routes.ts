import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = Router();

// matches api/users
router.get("/", getUsers);
router.post("/", createUser);

// matches api/users/:id (i.e. api/users/1)
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;