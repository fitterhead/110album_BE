const { sendResponse, AppError } = require("../helpers/utils.js");
const Playlist = require("../models/Playlist.js");

/* ------------------------------- create Playlist ------------------------------ */
const playlistController = {};
playlistController.createPlaylist = async (req, res, next) => {
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
  let filter = {};
  console.log("insideReq", req);
  // let playlistId = {};
  // let playlistParams = req.params;
  // console.log("playlistParams", playlistParams);
  let filterId = req.userId;
  if (filterId) filter = { userRef: `${filterId}` };
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

/* --------------------------- get single playlist -------------------------- */
playlistController.getSinglePlaylist = async (req, res, next) => {
  console.log("insideReq", req);
  let playlistParams = req.params;
  console.log("playlistParams", playlistParams);
  let filterId = req.userId;
  try {
    const singlePlaylist = await Playlist.find({
      userRef: `${filterId}`,
      _id: `${playlistParams._id}`,
    });
    sendResponse(
      res,
      200,
      true,
      { data: singlePlaylist },
      null,
      "Find single Playlist Success"
    );
  } catch (err) {
    next(err);
  }
};

/* ------------------------------- update Playlist ------------------------------ */
playlistController.updatePlaylistById = async (req, res, next) => {
  // const albumAdded = req.params;
  const currentUserId = req.userId;
  //63a7dcd9104af1c06b8b2482
  const { albumId, playlistId } = req.body;
  console.log("albumAdded", currentUserId);
  //{"_id":"63a3df92aba421e4cd7301b6"}
  const updateInfo = { $push: { albumRef: albumId } };
  // const updateInfo = { $pull: { albumRef: albumId } };
  const options = { new: true, upsert: true };
  try {
    //mongoose query
    const updated = await Playlist.findOneAndUpdate(
      { _id: playlistId, userRef: currentUserId },
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

/* ----------------------- delete album from playlist ----------------------- */
playlistController.deleteAlbumOnPlaylist = async (req, res, next) => {
  // const albumAdded = req.params;
  const currentUserId = req.userId;
  const { albumId, playlistId } = req.body;

  const updateInfo = { $pull: { albumRef: albumId } };
  const options = { new: true, upsert: true };
  try {
    //mongoose query
    const updated = await Playlist.findOneAndUpdate(
      { _id: playlistId, userRef: currentUserId },
      updateInfo,
      options
    );

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "delete Playlist success"
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
