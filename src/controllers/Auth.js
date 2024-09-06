import Users from "../models/UserModel.js";
import { loginService } from "../service/authService.js";
import { sendResponse } from "../utils/responseUtils.js";

export const Login = async (req, res) => {
    try {
        const result = await loginService(req.body);

        if (result.error) {
            return sendResponse(res, result.status, result.message, false, null);
        }

        return sendResponse(res, 200, 'Login success', true, result.data);
    } catch (error) {
        console.error('Error:', error);
        return sendResponse(res, 500, 'Internal server error', false, { error: error.message });
    }
}

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const logOut = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const users = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (users.length === 0) return res.sendStatus(204);

  const userId = users[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );

  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
