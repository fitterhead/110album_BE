const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/auth.controllers.js");
const validators = require("../helpers/middlewares/validators.js");

/**
 * @route POST /auth/login
 * @description login with email and pass
 * @body {username,email,password}
 * @access public
 */

router.post(
  "/login",
  validators.validate([
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  authController.loginWithEmail
);

module.exports = router;
