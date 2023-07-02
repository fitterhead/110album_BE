const express = require("express");
const router = express.Router();
/* ---------------------------- expressValidator ---------------------------- */
const { body, param } = require("express-validator");
const validators = require("../helpers/middlewares/validators.js");

const {
  deleteUserById,
  createUser,
  updateUserById,
  getAllUsers,
  getTotalUser,
  getCurrentUser,
  getCartByUserId,
  deleteCart,
} = require("../controllers/user.controllers.js");
const authentication = require("../helpers/middlewares/authentication.js");

/* ---------------------------------- Read ---------------------------------- */
/**
 * @route GET api/user/
 * @description get list of users
 * @access login required
 */
router.get("/", authentication.loginRequired, getAllUsers);
// router.get("/", getAllUsers);

/* -------------------------------- get total ------------------------------- */
/**
 * @route GET api/user/
 * @description get list of users
 * @access login required
 */
router.get("/total", authentication.loginRequired, getTotalUser);

/* ---------------------------- get current user ---------------------------- */

/**
 * @route GET api/user/myInfo
 * @description get your own account data
 * @access login required
 */

router.get("/myInfo", authentication.loginRequired, getCurrentUser);

/* --------------------------------- Create --------------------------------- */
/**
 * @route POST api/user
 * @description create new user
 * @access login required
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
 * @route PUT api/user/:id
 * @description update user informations
 * @access login required
* @req_body  {
  "username": "phi",
  "email": "morita@gmail.com",
  "password": "123456"
}
 */
router.put(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  updateUserById
);
/* --------------------------------- Delete --------------------------------- */
/**
 * @route DELETE api/user/:id
 * @description delete user
 * @access login required
 * @req_body  {
  "username": "phi",
  "email": "morita@gmail.com",
  "password": "123456"
}
 */
router.delete(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  deleteUserById
);

/* -------------------------------------------------------------------------- */
/*                                    cart                                    */
/* -------------------------------------------------------------------------- */

/**
 * @route GET api/user/myInfo
 * @description get your own account data
 * @access login required
 */

router.get("/cart", authentication.loginRequired, getCartByUserId);

/* ------------------------------- delete cart ------------------------------ */
/**
 * @route GET api/user/myInfo
 * @description get your own account data
 * @access login required
 */

router.put(
  "/cart/remove",
  //  authentication.loginRequired,
  deleteCart
);
module.exports = router;
