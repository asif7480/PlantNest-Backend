import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.mjs";
import generateToken from "../utils/generateToken.mjs";
import uploadFileOnCloudinary from "../utils/cloudinary.mjs";

const register = asyncHandler(async (request, response) => {
  const { username, email, password, role, age, city, avatar } = request.body;

  if (!username || !email || !password || !age || !city) {
    response.status(400);
    throw new Error("Input all fields.");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    response.status(401);
    throw new Error("User already registered.");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const uploadedOnCloudinary = await uploadFileOnCloudinary(request.file.path);

  console.log(uploadedOnCloudinary.url);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
    role,
    age,
    city,
    avatar: uploadedOnCloudinary.url,
  });

  response.status(201).json({ message: `User created.`, success: true, user });
});

const login = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({
      message: "Input all fields",
      success: false,
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return response.status(401).json({
      message: "User not registered.",
      success: false,
    });
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return response.status(401).json({
      message: "Invalid password",
      success: false,
    });
  }

  const token = generateToken(user._id);

  response.cookie("token", token, {
    maxAge: 6 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  response.status(200).json({
    message: "User login successfully",
    success: true,
    username: user.username,
    email: user.email,
    token,
  });
});

const logout = asyncHandler(async (request, response) => {
  response.clearCookie("token", {
    httpOnly: true,
    secure: false,
    // secure: true, // for production
    sameSite: "lax",
    // sameSite: "none" // for production
  });

  response.status(200).json({
    message: "logout successfully.",
    success: true,
  });
});

const profile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id).select("-password");

  response.status(200).json(user);
});

export { register, login, profile, logout };
