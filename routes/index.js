var express = require("express");
var router = express.Router();

/* ---------------------- import sendResponse, AppError --------------------- */
const { sendResponse, AppError } = require("../helpers/utils.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("Welcome to CoderSchool!");
});

console.log("working");

router.get("/template/:test", async (req, res, next) => {
  const { test } = req.params;
  try {
    //turn on to test error handling
    if (test === "error") {
      throw new AppError(401, "Access denied", "Authentication Error");
    } else {
      sendResponse(
        res,
        200,
        true,
        { data: "template" },
        null,
        "template success"
      );
    }
  } catch (err) {
    next(err);
  }
});
const fooRouter = require("./foo.api.js");
router.use("/foo", fooRouter);

//create user model
//create user Controller
//create userRouter api

/* ---------------------------- import userRouter --------------------------- */
const userRouter = require("./user.api.js");
router.use("/user", userRouter);

/* ------------------------------ albumsRouter ------------------------------ */
const albumRouter = require("./album.api.js");
router.use("/album", albumRouter);
/* ------------------------------ artistRouter ------------------------------ */
const artistRouter = require("./artist.api.js");
router.use("/artist", artistRouter);

/* ----------------------------- playlistRouter ----------------------------- */
const playlistRouter = require("./playlist.api.js");
router.use("/playlist", playlistRouter);

/* --------------------------------- export --------------------------------- */
module.exports = router;
