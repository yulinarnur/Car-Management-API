import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  }

  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  try {
    let existingUser = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ msg: "Email sudah terdaftar" });
    }

    if (req.role === "superadmin") {
      const newUser = await Users.create({
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      });

      return res.status(201).json({ msg: "Register Berhasil" });
    } else {
      if (role !== "member") {
        return res.status(403).json({ msg: "Anda tidak memiliki akses" });
      }

      const newUser = await Users.create({
        name: name,
        email: email,
        password: hashPassword,
        role: "member",
      });

      return res.status(201).json({ msg: "Register Berhasil" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { name, email, password, confPassword, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await bcrypt.hash(password, 10);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const createUserNonMember = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  }

  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  try {
    let existingUser = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ msg: "Email sudah terdaftar" });
    }
    if (role === "member" || role === undefined) {
      const newUser = await Users.create({
        name: name,
        email: email,
        password: hashPassword,
        role: "member",
      });
      return res.status(201).json({ msg: "Register Berhasil" });
    } else {
      return res.status(403).json({ msg: "Anda tidak memiliki akses" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};
