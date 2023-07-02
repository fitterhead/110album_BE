const { sendResponse, AppError } = require("../helpers/utils.js");
const Song = require("../models/Song.js");
const mongoose = require("mongoose");

const songController = {};
/* -------------------------------- add song -------------------------------- */

songController.addSong = async (req, res, next) => {
  const input = req.body;

  try {
    if (!input) throw new AppError(402, "Bad Request", "add Song error");
    const created = await Song.create(input);
    sendResponse(res, 200, true, created, null, "ADD_SONG_SUCCESS");
  } catch (error) {
    next(error);
  }
};
/* ------------------------------ get all songs ----------------------------- */

songController.getSong = async (req, res, next) => {
  console.log(req.query, "req.query˝");
  let { filterName, input } = req.query;
  // const where = { [filterName]: { $regex: input, $options: "i" } };
  const where = { [filterName]: input };

  try {
    const songList = await Song.find(where)
      .populate("artistRef")
      .populate("albumRef");

    sendResponse(res, 200, true, songList, null, "FIND_SONG_SUCCESS");
  } catch (error) {
    next(error);
  }
};

/* ---------------------------- delete all songs ---------------------------- */

songController.deleteAllSong = async (req, res, next) => {
  try {
    const response = await Song.deleteMany({});

    sendResponse(res, 200, true, response, null, "DELETE_ALL_SONG_SUCCESS");
  } catch (error) {
    next(error);
  }
};

/* --------------------------------- export --------------------------------- */
module.exports = songController;


