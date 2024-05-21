import express from "express";
import multer from "multer";
import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/Cars.js";
import { verifyUser } from "../middleware/AuthUser.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/cars", verifyToken, verifyUser, getCars);
router.get("/cars/:id", verifyToken, verifyUser, getCarById);
router.post(
  "/cars",
  verifyToken,
  verifyUser,
  upload.single("images"),
  createCar
);
router.patch(
  "/cars/:id",
  verifyToken,
  verifyUser,
  upload.single("images"),
  updateCar
);
router.delete("/cars/:id", verifyToken, verifyUser, deleteCar);

export default router;
