import { response } from "express";
import Cars from "../models/CarModel.js";
import Users from "../models/UserModel.js";
import path from "path";
import fs from "fs";

const saveImg = (image) => {
  if (!image || !image.name || !image.data) {
    throw new Error("Invalid image object");
  }

  const imgPath = path.join(__dirname, "../public/uploads", image.name);
  fs.writeFileSync(imgPath, image.data);
  return `../public/uploads/${image.name}`;
};

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const getCars = async (req, res) => {
  try {
    let response;
    response = await Cars.findAll({
      attributes: [
        "id",
        "uuid",
        "model",
        "rentPerDay",
        "images",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Users,
          attributes: [
            "id",
            "uuid",
            "name",
            "email",
            "role",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Cars.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!car) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    response = await Cars.findOne({
      where: {
        id: car.id,
      },
      include: [
        {
          model: Users,
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCar = async (req, res) => {
  const { model, rentPerDay } = req.body;
  const imageName = req.file.path;
  try {
    await Cars.create({
      model: model,
      rentPerDay: rentPerDay,
      images: imageName,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Car Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log("apaaa yaa", error);
  }
};

export const updateCar = async (req, res) => {
  try {
    const car = await Cars.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!car) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { model, rentPerDay } = req.body;

    // cek gambar
    if (req.file && req.file.filename) {
      const imageUrl = req.file.path;
      car.images = imageUrl;
      console.log("tesssssss url img", imageUrl);
    }
    if (req.role !== "member") {
      await Cars.update(
        { model, rentPerDay, images: car.images },
        {
          where: {
            id: car.id,
          },
        }
      );
    } else {
      if (req.role === "member")
        return res
          .status(403)
          .json({ msg: "Akses hanya untuk Superadmin & Admin" });
    }
    res.status(200).json({ msg: "Car updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const car = await Cars.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!car) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const imageName = path.basename(car.images);
    // url gambar
    const imgPath = path.join(__dirname, "../public/uploads", imageName);
    console.log("halaman path", imgPath);
    //  hapus gambar nya
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }

    if (req.role !== "member") {
      await Cars.destroy({
        where: {
          id: car.id,
        },
      });
    } else {
      if (req.role === "member")
        return res
          .status(403)
          .json({ msg: "Akses hanya untuk Superadmin & Admin" });
    }
    res.status(200).json({ msg: "Car deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
