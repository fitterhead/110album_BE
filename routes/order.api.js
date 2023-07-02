const express = require("express");
const router = express.Router();
const { getAllOrders } = require("../controllers/order.controllers.js");
const { createOrder } = require("../controllers/order.controllers.js");
/* ---------------------------------- Read ---------------------------------- */
/**
 * @route GET api/Order
 * @description get list of Orders, find Order has userRef = userId
 * @access loginRequired
 * @example http://localhost:8000/Order/
 */
router.get(
  "/",

  // authentication.loginRequired,
  getAllOrders
);

/* --------------------------------- Create --------------------------------- */
/**
 * @route POST api/Order
 * @description create new Order
 * @body {
    orderStatus: { type: String, default: "finished" },
    product: { type: Array, default: [] },
  },
 * @access loginRequired
 */
router.post(
  "/",
  // authentication.loginRequired,
  // validators.validate([
  //   body("isDeleted", "Invalid isDeleted").exists().notEmpty(),
  //   body("OrderName", "Invalid OrderName").exists().notEmpty(),
  //   body("userRef", "Invalid userRef")
  //     .exists()
  //     .isString()
  //     .custom(validators.checkObjectId),
  // ]),
  createOrder
);



module.exports = router;
