const { AppError, sendResponse } = require("../helpers/utils");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const authController = {};
authController.loginWithEmail = async (req, res, next) => {
  /* -------------------------------- 1.getdata ------------------------------- */

  try {
    const { email, password } = req.body;
    /* ---------------------- 2. business Logic validation ---------------------- */
    const user = await User.findOne({ email }, "+password");
    if (!user) {
      throw new AppError(400, "Invalid Credential", "Login Error");
    }

    /* ------------------------------- 3. Process ------------------------------- */
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("ismatch", isMatch);
    // so sanh giua password da ma hoa va password chua ma hoa
    if (!isMatch) {
      throw new AppError(400, "invalid Password", "Login Error");
    }

    const accessToken = await user.generateToken();
    sendResponse(
      res,
      200,
      true,
      { data: user, accessToken: accessToken },
      null,
      "Login successful"
    );
  } catch (error) {
    next(err);
  }
};
/* ------------------------------- 4.response ------------------------------- */

module.exports = authController;
