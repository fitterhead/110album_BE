const { AppError, sendResponse } = require("../helpers/utils");

const Order = require("../models/Order");

// create new order
//receive body
// create new object with date, orderStatus, product [
//{albumId, amount}
//]
// response

/* ---------------------- create orderController object --------------------- */

const orderController = {};

/* ----------------------------- get all orders ----------------------------- */

orderController.getAllOrders = async (req, res, next) => {
  try {
    const orderList = await Order.find({});
    sendResponse(
      res,
      200,
      true,
      { data: orderList },
      null,
      "find all orders Success"
    );
  } catch (error) {
    next(error);
  }
};

/* ---------------------------- create new order ---------------------------- */
orderController.createOrder = async (req, res, next) => {
  const data = req.body;

  console.log("data", data);

  try {
    const order = await Order.create(data);
    sendResponse(
      res,
      200,
      true,
      { data: order },
      null,
      "create new order Success"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = orderController;
