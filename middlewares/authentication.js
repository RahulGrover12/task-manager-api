import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(401).json({ message: "Token has Expired" });
    }
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authenticate;
