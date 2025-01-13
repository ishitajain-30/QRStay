import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "main_admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyGuestAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "guest_admin") {
      return res.status(403).json({ message: "Guest admin access required" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
