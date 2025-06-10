import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import generateToken from "../config/jwtToken.js";

export const userRegister = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      dob,
      gender,
      qualification,
      department,
      position,
      hiringDate,
      salary,
      password,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !dob ||
      !gender ||
      !qualification ||
      !department ||
      !position ||
      !hiringDate ||
      !salary ||
      !password
    ) {
      console.log("all fields required");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const ProfilePic =
      `https://placehold.co/600x400?text=` + fullName.charAt(0).toUpperCase();

    const newUser = await User.create({
      fullName,
      email,
      phone,
      dob,
      gender,
      qualification,
      department,
      position,
      hiringDate,
      salary,
      profilePic: ProfilePic,
      password: hashedPassword,
      status: "Active",
    });

    res.status(200).json({ messsage: "User Created ", newUser });
  } catch (e) {
    console.log(e.message);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      return next(error);
    }

    //generate token
    generateToken(user._id, res);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
        qualification: user.qualification,
        department: user.department,
        position: user.position,
        hiringDate: user.hiringDate,
        salary: user.salary,
        password: user.password,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
