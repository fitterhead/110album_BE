const { sendResponse, AppError } = require("../helpers/utils.js");
const User = require("../models/User.js");

/* ------------------------------- create User ------------------------------ */
const userController = {};
userController.createUser = async (req, res, next) => {
  // const signinInput = {
  //   username: "foo",
  //   email: "yeezy@gmail.com",
  //   password: "qwerty",
  // };
  console.log("insideReq", req);
  const signinInput = req.body;
  try {
    if (!signinInput)
      throw new AppError(402, "Bad Request", "Create user Error");
    const created = await User.create(signinInput);
    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Signin user Success"
    );
  } catch (err) {
    next(err);
  }
};

/* ------------------------------ get all User ------------------------------ */
userController.getAllUsers = async (req, res, next) => {
  const filter = {};
  console.log("insideReq", req);

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

/* ------------------------------- update User ------------------------------ */
userController.updateUserById = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication
  //you will also get updateInfo from req
  // empty target and info mean update nothing

  // const targetId = null;
  // console.log("insideReq", req);
  const targetId = req.params;
  const updateInfo = "";
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
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

/* ------------------------------- delete user ------------------------------ */
userController.deleteUserById = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication

  // empty target mean delete nothing
  console.log("insideReq", req);
  const targetId = null;
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
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
