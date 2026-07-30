import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUser,
  updateUserInfo,
  createUser,
} from "../model/user.Model.js";

import bcrypt from "bcrypt";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserByEmailController = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;

    await deleteUser(userId);

    return res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUserInfoController = async (req, res) => {
  try {
    const userId = req.params.id;

    const { email, name, role, password } = req.body;

    const existedUser = await getUserById(userId);

    if (!existedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let hashedPassword = existedUser.hashed_password;

    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await updateUserInfo(userId, {
      name: name || existedUser.name,
      email: email || existedUser.email,
      role: role || existedUser.role,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "Updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, email, password } = req.body;

    const existedUser = await getUserById(userId);

    if (!existedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (email && email !== existedUser.email) {
      const emailExists = await getUserByEmail(email);

      if (emailExists) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
    }

    let hashedPassword = existedUser.hashed_password;

    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await updateUserInfo(userId, {
      name: name || existedUser.name,
      email: email || existedUser.email,
      role: existedUser.role,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createUserController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
