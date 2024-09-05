import express from "express";
import multer from "multer";
import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/Cars.js";
import { verifyUser, superAdminAndAdmin } from "../middleware/AuthUser.js";
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

router.get("/cars/getAll", verifyToken, verifyUser, getCars);
router.get("/cars/getById/:id", verifyToken, verifyUser, getCarById);
router.post(
  "/cars/add",
  verifyToken,
  verifyUser,
  superAdminAndAdmin,
  upload.single("images"),
  createCar
);
router.patch(
  "/cars/edit/:id",
  verifyToken,
  verifyUser,
  superAdminAndAdmin,
  upload.single("images"),
  updateCar
);
router.delete(
  "/cars/delete/:id",
  verifyToken,
  verifyUser,
  superAdminAndAdmin,
  deleteCar
);

export default router;
