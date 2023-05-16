const { sendResponse, AppError } = require("../helpers/utils.js");
const Playlist = require("../models/Playlist.js");
const mongoose = require("mongoose");
/* ------------------------------- create Playlist ------------------------------ */
const playlistController = {};
playlistController.createPlaylist = async (req, res, next) => {
  try {
    const playlistInput = req.body;

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
  let filterId = req.userId;
  let { userId } = req.query;

  console.log("user iddddddddd", userId);
  // if (filterId) filter = { userRef: `${filterId}` };

  if (userId) filter = { userRef: `${userId}` };

  if (!userId && filterId) filter = { userRef: `${filterId}` };
  console.log(filter, "filterrrrr");
  try {
    const listOfPlaylist = await Playlist.find(filter).populate("albumRef");
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
    }).populate("albumRef");
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
  const currentUserId = req.userId;
  const { albumId, playlistId } = req.body;
  console.log("albumAdded", currentUserId);
  const updateInfo = { $push: { albumRef: albumId } };
  const options = { new: true, upsert: true };
  try {
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

  // const updateInfo = { $pull: { albumRef: albumId } };
  const options = { new: true, upsert: true };
  try {
    const updated = await Playlist.findOneAndUpdate(
      { _id: playlistId, userRef: currentUserId },
      // updateInfo,
      { $pull: { albumRef: albumId } },
      options
    );

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      { albumId: albumId },
      { playlistId: playlistId },
      null,
      "delete Playlist success"
    );
  } catch (err) {
    next(err);
  }
};
/* ------------------------------- delete Playlist ------------------------------ */
playlistController.deletePlaylistById = async (req, res, next) => {
  const currentUserId = req.userId;
  const playlistId = req.params._id;
  console.log("insideReq", playlistId);
  const targetId = { _id: playlistId, userRef: currentUserId };
  console.log("targetId", targetId);
  const options = { new: true, upsert: true };
  try {
    const updated = await Playlist.findOneAndUpdate(
      targetId,
      { isDeleted: true },
      options
    );

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
