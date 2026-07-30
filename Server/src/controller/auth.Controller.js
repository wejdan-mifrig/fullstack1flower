import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { register } from "../model/auth.Model.js";

import {
  getUserByEmail,
  getUserById,
  saveRefreshTokens,
} from "../model/user.Model.js";

import {
  generateAccessTokens,
  generateRefreshTokens,
} from "../Utils/tokens.js";

import { asyncHandler } from "../middleware/asyncHandler.Middleware.js";

export const registerController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const isExist = await getUserByEmail(email);

  if (isExist) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashed_password = await bcrypt.hash(password, 10);

  const user = await register(name, email, hashed_password);

  return res.status(201).json({
    message: "Registered Successfully",
    user,
  });
});

export const loginController = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const isExist = await getUserByEmail(email);

    if (!isExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, isExist.hashed_password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Password or Email is incorrect" });
    }

    const accessToken = generateAccessTokens(isExist);
    const refreshToken = generateRefreshTokens(isExist);

    const hashedRefresh = await bcrypt.hash(refreshToken, 10);

    await saveRefreshTokens(isExist.id, hashedRefresh);

    res.cookie("refreshTokens", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Login successfully",
      accessToken, // ✔ مهم
      user: {
        id: isExist.id,
        email: isExist.email,
        name: isExist.name,
        role: isExist.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshTokens;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

  const user = await getUserById(decoded.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const valid = await bcrypt.compare(refreshToken, user.refresh_tokens);

  if (!valid) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  const newAccessToken = generateAccessTokens(user);
  const newRefreshToken = generateRefreshTokens(user);

  const hashedNewRefresh = await bcrypt.hash(newRefreshToken, 10);

  await saveRefreshTokens(user.id, hashedNewRefresh);

  res.cookie("refreshTokens", newRefreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return res.json({
    accessToken: newAccessToken,
  });
});

export const me = asyncHandler(async (req, res) => {
  try {
    const id = req.user?.id;

    if (!id) {
      return res.status(401).json({ message: "Unauthorized - no user id" });
    }

    const user = await getUserById(id); // ✔ FIX هنا

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "OK",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
export const logoutController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshTokens;

  res.clearCookie("refreshTokens", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  if (req.user?.id) {
    await saveRefreshTokens(req.user.id, null);
  }

  return res.status(200).json({
    message: "Logged out successfully",
  });
});
