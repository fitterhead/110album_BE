const { sendResponse, AppError } = require("../helpers/utils.js");
const Playlist = require("../models/Playlist.js");

/* ------------------------------- create Playlist ------------------------------ */
const playlistController = {};
playlistController.createPlaylist = async (req, res, next) => {
//   console.log("insideReq", req);
  const playlistInput = req.body;
  try {
    if (!playlistInput)
      throw new AppError(402, "Bad Request", "Create Playlist Error");
    const created = await Playlist.create(playlistInput);
    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Create Playlist Success"
    );
  } catch (err) {
    next(err);
  }
};

/* ------------------------------ get all Playlist ------------------------------ */
playlistController.getAllPlaylists = async (req, res, next) => {
  const filter = {};
  console.log("insideReq", req);

  try {
    const listOfPlaylist = await Playlist.find(filter);
    sendResponse(
      res,
      200,
      true,
      { data: listOfPlaylist },
      null,
      "Find List of Playlist Success"
    );
  } catch (err) {
    next(err);
  }
};

/* ------------------------------- update Playlist ------------------------------ */
playlistController.updatePlaylistById = async (req, res, next) => {
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
    const updated = await Playlist.findByIdAndUpdate(
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
      "Update Playlist success"
    );
  } catch (err) {
    next(err);
  }
};

/* ------------------------------- delete Playlist ------------------------------ */
playlistController.deletePlaylistById = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication

  // empty target mean delete nothing
  console.log("insideReq", req);
  const targetId = null;
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Playlist.findByIdAndDelete(targetId, options);

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Delete Playlist success"
    );
  } catch (err) {
    next(err);
  }
};
/* --------------------------------- export --------------------------------- */

module.exports = playlistController;
