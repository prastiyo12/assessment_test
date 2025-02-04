import { Router } from "express";
import { getUsers, getUserById, createUser, deleteUser } from '../controllers/userController';

const router = Router();

router.post("/user", createUser);
router.delete("/user/:id", deleteUser);

export default router;
