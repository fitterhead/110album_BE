const { sendResponse, AppError } = require("../helpers/utils.js");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const Playlist = require("../models/Playlist.js");
const mongoose = require("mongoose");
/* -------------------------------------------------------------------------- */
/*                                register user                               */
/* -------------------------------------------------------------------------- */
const userController = {};
userController.createUser = async (req, res, next) => {
  /* -------------------------------- 1.getdata ------------------------------- */
  const signinInput = req.body;
  let { email, password, username, isAdmin } = signinInput;

  try {
    /* ---------------------- 2. business Logic validation ---------------------- */
    let existingUser = await User.findOne({ email });
    if (!signinInput || existingUser)
      throw new AppError(402, "Bad Request", "Create user Error");
    // const created = await User.create(signinInput);

    /* ------------------------------- 3. Process ------------------------------- */
    //bcrypt process
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const created = await User.create({ email, password, username, isAdmin });

    /* ------ tự động login người dùng sau khi đã tạo tài khoản thành công ------ */
    // mỗi lần cần lấy accesstoken thì chạy function để tạo token đó ra , rồi gửi token đó cho
    //front end bằng sendResponse
    // const likedSong = await Playlist.create({
    //   playlistName: created.data._id,
    //   userRef: created.data._id,
    // });
    const accessToken = await created.generateToken();

    /* ------------------------------- 4.response ------------------------------- */
    sendResponse(
      res,
      200,
      true,
      { data: created, accessToken: accessToken },
      null,
      "Signin user Success"
    );
  } catch (err) {
    next(err);
  }
};

/* ------------------------------ get all User ------------------------------ */
userController.getAllUsers = async (req, res, next) => {
  let filter = {};
  console.log("idUser", req.userId);
  console.log("req", req);
  let filterId = req.userId;
  if (filterId) filter = { _id: `${filterId}` };
  try {
    const listOfUser = await User.find(filter);
    sendResponse(
      res,
      200,
      true,
      { data: listOfUser },
      null,
      "Find List of User Success"
    );
  } catch (err) {
    next(err);
  }
};

/* -------------------------------------------------------------------------- */
/*                               get entire user                              */
/* -------------------------------------------------------------------------- */

userController.getTotalUser = async (req, res, next) => {
  let filter = {};
  try {
    const listOfUser = await User.find(filter);
    sendResponse(
      res,
      200,
      true,
      { data: listOfUser },
      null,
      "Find getTotalUser Success"
    );
  } catch (err) {
    next(err);
  }
};

/* ---------------------------- get Current User ---------------------------- */
userController.getCurrentUser = async (req, res, next) => {
  let filter = {};
  console.log("insideReq", req.headers);
  console.log("idUser", req.userId);
  let filterId = req.userId;
  if (filterId) filter = { _id: `${filterId}` };
  try {
    const listOfUser = await User.findById(filterId);
    sendResponse(
      res,
      200,
      true,
      { user: listOfUser },
      null,
      "Find current User Success"
    );
  } catch (err) {
    next(err);
  }
};

/* ------------------------------- update User ------------------------------ */

userController.updateUserById = async (req, res, next) => {
  const targetId = req.params;
  const { albumId, type, description } = req.body;

  try {
    const user = await User.findById(targetId.id);
    if (!user) {
      return sendResponse(res, 404, false, null, "User not found");
    }

    const cartItemIndex = user.cart.findIndex(
      (item) => item.reference_id.toString() === albumId
    );

    if (cartItemIndex !== -1) {
      // If the albumId exists in the cart
      if (type === "minus") {
        if (user.cart[cartItemIndex].amount === 1) {
          // If the amount is 1, remove the cart item
          user.cart.splice(cartItemIndex, 1);
        } else {
          // Decrease the amount by 1
          user.cart[cartItemIndex].amount -= 1;
          user.cart[cartItemIndex].price -= 19;
        }
      } else if (type === "plus") {
        // Increase the amount by 1
        user.cart[cartItemIndex].amount += 1;
        user.cart[cartItemIndex].price += 19;
      } else if (type === "delete") {
        user.cart.splice(cartItemIndex, 1);
      }
    } else {
      // If the albumId doesn't exist, add a new cart item
      user.cart.push({
        reference_id: albumId,
        amount: 1,
        price: 19,
        description: description,
      });
    }

    const updatedUser = await user.save();

    sendResponse(
      res,
      200,
      true,
      { data: updatedUser },
      null,
      "Update User success"
    );
  } catch (err) {
    next(err);
  }
};

/* ------------------------------- delete user ------------------------------ */
userController.deleteUserById = async (req, res, next) => {
  const targetId = req.userId;
  console.log(targetId, "target delete USer");
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true, upsert: true };
  try {
    const deleteUser = await User.findByIdAndUpdate(
      targetId,
      { isDeleted: true },
      options
    );

    sendResponse(
      res,
      200,
      true,
      { data: deleteUser },
      null,
      "Delete User success"
    );
  } catch (err) {
    next(err);
  }
};

/* -------------------------------------------------------------------------- */
/*                                    cart                                    */
/* -------------------------------------------------------------------------- */

userController.getCartByUserId = async (req, res, next) => {
  const targetId = req.userId;
  try {
    const userCart = await User.findById(targetId).populate(
      "cart.reference_id"
    );

    sendResponse(
      res,
      200,
      true,
      { data: userCart },
      null,
      "find cart of user success"
    );
  } catch (err) {
    next(err);
  }
};

/* ------------------------------- delete cart ------------------------------ */

userController.deleteCart = async (req, res, next) => {
  const targetId = req.body.userId;
  console.log(targetId, "targetId");
  try {
    const userCart = await User.findByIdAndUpdate(
      targetId,
      {
        $set: { cart: [] },
      },
      { new: true }
    );

    sendResponse(
      res,
      200,
      true,
      { data: userCart },
      null,
      "delete cart of user success"
    );
  } catch (err) {
    next(err);
  }
};

// userController.deleteCart = async (req, res, next) => {
//   const targetId = req.userId;

//   try {
//     console.log("useriDdddddd");
//     // console.log(userId, "useriDdddddd");

//     const user = await User.findByIdAndUpdate(
//       targetId,
//       { $set: { cart: [] } },
//       { new: true }
//     );

//     sendResponse(res, 200, true, { data: user }, null, "delete cart success");
//   } catch (err) {
//     next(err);
//   }
// };
/* --------------------------------- export --------------------------------- */

module.exports = userController;
