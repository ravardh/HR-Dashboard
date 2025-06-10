import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";


export const userProtect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const verifyUser = await User.findById(decode.key);

        req.user = verifyUser;
        console.log("User Verified" , verifyUser.fullName);
        
        next();
    } catch (e) {
        console.log("Token Not Found");

    }
}
