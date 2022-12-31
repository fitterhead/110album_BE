const jwt = require("jsonwebtoken");
const { AppError } = require("../utils");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authentication = {};

authentication.loginRequired = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    // let tokenString = req.headers;
    console.log("tokenString", tokenString);
    if (!tokenString) throw new AppError(400, "invalid Token", "Login Error");

    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new AppError(400, " Token Expired", "Auth Error");
        } else {
          throw new AppError(400, " Token Invalid", "Auth Error");
        }
      }

      req.userId = payload._id;
    });
    next();
    // day la middleware, auth on thi app se chay vao controller
    // neu auth thanh cong thi controller se lay dc user Id
  } catch (error) {
    next(error);
  }
};
module.exports = authentication;
