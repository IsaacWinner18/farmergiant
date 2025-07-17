const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    // console.log("Cookies:", req.cookies.token);
  const token = req.cookies.token;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized, please log in", authenticated: true });
    }

    const user = jwt.verify(token, process.env.MY_SECRET);
    req.user = user;
    
    next();
  } catch (err) {
    return res
      .status(201)
      .json({
        message: "Invalid token or error occured in authmiddleware logic",
        authenticated: false,
      });
  }

};

module.exports = authMiddleware;
