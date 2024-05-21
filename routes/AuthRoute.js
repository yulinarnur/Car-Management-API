import express from "express";
import { Login, logOut, Me } from "../controllers/Auth.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { verifyUser } from "../middleware/AuthUser.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/me", verifyUser, verifyToken, Me);
router.post("/login", Login);
router.delete("/logout", logOut);
router.get("/token", refreshToken);

export default router;
