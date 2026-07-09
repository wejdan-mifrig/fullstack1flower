export const adminOnly = async (req, res, next) => {
  const role = req.user.role;
  if (role !== "admin") {
    return res
      .status(401)
      .json({ message: "you dont have access to this action" });
  }
  return next();
};
