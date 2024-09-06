import jwt from "jsonwebtoken";

export const createAccessToken = (user) => {
    const { uuid, name, email, role } = user;
    return jwt.sign(
        {  uuid, name, email, role }, 
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "40s"} 
    );
};

export const createRefreshToken = (user) => {
    const { uuid, name, email, role } = user;
    return jwt.sign(
        { uuid, name, email, role }, 
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d"} 
    );
}