const express = require("express");
const router = express.Router();
/* ---------------------------- expressValidator ---------------------------- */
const { body } = require("express-validator");
const validators = require("../helpers/middlewares/validators.js");

const {
  deleteUserById,
  createUser,
  updateUserById,
  getAllUsers,
} = require("../controllers/user.controllers.js");


/* ---------------------------------- Read ---------------------------------- */
/**
 * @route GET api/user
 * @description get list of users
 * @access public
 */
router.get("/", getAllUsers);

/* --------------------------------- Create --------------------------------- */
/**
 * @route POST api/user
 * @description create new user
 * @access public
  * @req_body  {
  "username": "phi",
  "email": "morita@gmail.com",
  "password": "123456"
}
 */
router.post(
  "/",
  validators.validate([
    body("username", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  createUser
);
/* --------------------------------- Update --------------------------------- */
/**
 * @route PUT api/user
 * @description create new user
 * @access public
 */
router.put("/:id", updateUserById);
/* --------------------------------- Delete --------------------------------- */
/**
 * @route DELETE api/user
 * @description create new user
 * @access public
 */
router.delete("/:id", deleteUserById);

module.exports = router;
