import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";
import {
  verifyUser,
  adminOnly,
  superAdminOnly,
} from "../middleware/AuthUser.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/users", verifyUser, verifyToken, superAdminOnly, getUsers);
router.get("/users/:id", verifyUser, verifyToken, superAdminOnly, getUserById);
router.post("/users", createUser);
router.patch("/users/:id", verifyUser, verifyToken, superAdminOnly, updateUser);
router.delete(
  "/users/:id",
  verifyUser,
  verifyToken,
  superAdminOnly,
  deleteUser
);

export default router;
