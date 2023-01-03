const { sendResponse, AppError } = require("../helpers/utils.js");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

/* -------------------------------------------------------------------------- */
/*                                register user                               */
/* -------------------------------------------------------------------------- */
const userController = {};
userController.createUser = async (req, res, next) => {
  /* -------------------------------- 1.getdata ------------------------------- */
  const signinInput = req.body;
  let { email, password, username } = signinInput;

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
    const created = await User.create({ email, password, username });

    /* ------ tự động login người dùng sau khi đã tạo tài khoản thành công ------ */
    // mỗi lần cần lấy accesstoken thì chạy function để tạo token đó ra , rồi gửi token đó cho
    //front end bằng sendResponse
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

/* ---------------------------- get Current User ---------------------------- */
userController.getCurrentUser = async (req, res, next) => {
  let filter = {};
  console.log("insideReq", req.headers);
  console.log("idUser", req.userId);
  let filterId = req.userId;
  // if (filterId) filter = { _id: `${filterId}` };
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
  const playlistAdded = req.body;
  // const updateInfo = "";
  //options allow you to modify query. e.g new true return lastest update of data
  // const updateInfo = { $push: { playlistRef: playlistAdded } };
  // const options = { new: true, upsert: true };
  try {
    //mongoose query
    const updated = await User.findByIdAndUpdate(
      targetId.id,
      updateInfo,
      options
    );

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Update User success"
    );
  } catch (err) {
    next(err);
  }
};

// playlistController.updatePlaylistById = async (req, res, next) => {
//   const targetId = req.params;
//   //63a7dcd9104af1c06b8b2482
//   const albumAdded = req.body;
//   console.log("albumAdded", req.body);
//   //{"_id":"63a3df92aba421e4cd7301b6"}
//   const updateInfo = { $push: { albumRef: albumAdded } };
//   const options = { new: true, upsert: true };
//   try {
//     //mongoose query
//     const updated = await Playlist.findByIdAndUpdate(
//       targetId.id,
//       updateInfo,
//       options
//     );

//     sendResponse(
//       res,
//       200,
//       true,
//       { data: updated },
//       null,
//       "Update Playlist success"
//     );
//   } catch (err) {
//     next(err);
//   }
// };

/* ------------------------------- delete user ------------------------------ */
userController.deleteUserById = async (req, res, next) => {
  console.log("insideReq", req);
  const targetId = null;
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    const updated = await User.findByIdAndDelete(targetId, options);

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Delete User success"
    );
  } catch (err) {
    next(err);
  }
};
/* --------------------------------- export --------------------------------- */

module.exports = userController;

/* ------------------------------- soft delete ------------------------------ */

// carController.deleteCar = async (req, res, next) => {
//   let { id } = req.params;
//   const targetId = id || "";
//   const options = { isEnabled: false };
//   if (!targetId) next();

//   try {
//     //mongoose query
//     const updated = await Car.findByIdAndUpdate(targetId, options);

//     sendResponse(
//       res,
//       200,
//       true,
//       { Car: updated },
//       null,
//       "Delete Car Successfully!"
//     );
//   } catch (err) {
//     next(err);
//   }
// };
// module.exports = carController;

/* ------------------------ browse album with filter ------------------------ */

// **
//  * @route GET API/task
//  * @description Browse your tasks with filter allowance
//  * @access private
//  */

// taskController.findTaskByFilter = async (req, res, next) => {
//   try {
//     const allowUpdate = [
//       "name",
//       "description",
//       "status",
//       "assignee",
//       "isFinished",
//       "assignee",
//     ];
//     const updates = req.query;
//     const updateKeys = Object.keys(updates);
//     const notAllow = updateKeys.filter((el) => !allowUpdate.includes(el));
//     if (notAllow.length) {
//       throw new AppError(401, "Bad request", "filter Input is not validated");
//     }

//     const findTaskByFilter = await Task.find(updates).sort([["createdAt", -1]]);
//     if (Object.keys(findTaskByFilter).length === 0) {
//       throw new AppError(401, "Bad request", "cant find filter");
//     }
//     sendResponse(res, 200, true, findTaskByFilter, null, "taskByFilterfound");
//   } catch (error) {
//     next(error);
//   }
// };
