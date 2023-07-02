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
    let filter = {};
    // console.log("insideReq", req.body);
    // let filterId = req.body.userId;
    let { userId } = req.query;

    console.log("insideReq", userId);
    if (userId) filter = { userId: `${userId}` };
    const orderList = await Order.find(filter)
      .populate("userId")
      .populate("product.reference_id");
    let productDetail = [];

    orderList.map((e) => {
      for (let i = 0; i < e.product.length; i++) {
        productDetail.push(e.product[i]);
      }
    });

    sendResponse(
      res,
      200,
      true,
      {
        data: orderList,
        // productItem: productDetail,
      },
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

  console.log("data from frontend", data);

  try {
    const order = await Order.create(data);
    sendResponse(
      res,
      200,
      true,
      { data: order },
      null,
      "success transaction recorded backend"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = orderController;

/* ------------------------ find order of one person ------------------------ */
