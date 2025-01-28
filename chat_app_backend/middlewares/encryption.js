import bcrypt from "bcrypt";

const encryptPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    req.body.password = hashedPassword;

    next();
  } catch (error) {
    return res.status(500).json({ message: "Failed to hash password" });
  }
};

export default encryptPassword;
