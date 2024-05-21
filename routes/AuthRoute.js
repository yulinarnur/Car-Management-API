import express from "express";
import { Login, logOut, Me } from "../controllers/Auth.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", logOut);
router.get("/token", refreshToken);

export default router;
