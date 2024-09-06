import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "./tokenService.js";

const getUser = async (email) => {
    return await Users.findOne({ where: { email: email } });
}

const verifyPassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
}

const updateRefreshToken = async (uuid, refreshToken) => {
    await Users.update({ refresh_token: refreshToken }, { where: { uuid } });
}

export const loginService = async (body) => {
    try {
        const { email, password } = body;

        const user = await getUser(email);
        if (!user) {
            return { error: true, status: 404, message: 'Email not found' };
        }

        const match = await verifyPassword(password, user.password);
        if (!match) {
            return { error: true, status: 401, message: 'Password does not match' };
        }

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        await updateRefreshToken(user.uuid, refreshToken);

        return { error: false, status: 200, message: 'Login success', data: { accessToken, refreshToken } };
    } catch (error) {
        console.error('Service Error:', error);
        return { error: true, status: 500, message: 'Internal server error' };
    }
}