import User from "../models/usermodel.js";

export const userProfile = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        department: user.department,
        position: user.position,
        gender: user.gender,
        profilePic: user.profilePic,
        qualification: user.qualification,
        hiringDate: user.hiringDate,
        salary: user.salary,
        status: user.status,
        weekOff: user.weekOff,
        address: user.address,
        shiftStartTime: user.shiftStartTime,
        shiftEndTime: user.shiftEndTime,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    next(error);
  }
};