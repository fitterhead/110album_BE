const express = require("express");
const router = express.Router();
const {
  deleteAlbumOnPlaylist,
  deletePlaylistById,
  createPlaylist,
  getSinglePlaylist,
  updatePlaylistById,
  getAllPlaylists,
} = require("../controllers/playlist.controllers.js");
const authentication = require("../helpers/middlewares/authentication.js");
const validators = require("../helpers/middlewares/validators.js");
const { body, param } = require("express-validator");

/* ---------------------------------- Read ---------------------------------- */
/**
 * @route GET api/Playlist
 * @description get list of Playlists, find playlist has userRef = userId
 * @access loginRequired
 * @example http://localhost:8000/playlist/
 */
router.get("/", authentication.loginRequired, getAllPlaylists);

/* --------------------------- get single playlist -------------------------- */
/**
 * @route GET api/Playlist/:id
 * @description get single playlist
 * @access loginRequired
 * @example http://localhost:8000/playlist/63b38e1743c84446d10e8f20
 */
router.get(
  "/:_id",
  authentication.loginRequired,
  validators.validate([
    param("_id").exists().isString().custom(validators.checkObjectId),
  ]),
  getSinglePlaylist
);

getSinglePlaylist;
/* --------------------------------- Create --------------------------------- */
/**
 * @route POST api/Playlist
 * @description create new Playlist
 * @body {
    isDeleted: false
    playlistName: "my playlist",
    userRef: "akjdhaskjdhsajdh"
  },
 * @access loginRequired
 */
router.post(
  "/",
  authentication.loginRequired,
  validators.validate([
    // body("isDeleted", "Invalid isDeleted").exists().notEmpty(),
    body("playlistName", "Invalid playlistName").exists().notEmpty(),
    body("userRef", "Invalid userRef")
      .exists()
      .isString()
      .custom(validators.checkObjectId),
  ]),
  createPlaylist
);
/* --------------------------------- Update --------------------------------- */
/**
 * @route PUT api/addAlbumToPlaylist
 * @description add album to playlist
 * @access loginRequired
* @example http://localhost:8000/playlist/addAlbumToPlaylist
* @body {
    isDeleted: false
    playlistName: "my playlist",
    userRef: "akjdhaskjdhsajdh"
  },
 */
router.put(
  "/addAlbumToPlaylist",
  authentication.loginRequired,
  updatePlaylistById
);

/* ----------------------- delete album from playlist ----------------------- */
/**
 * @route PUT api/Playlist
 * @description delete album from playlist
 * @access loginRequired
 * @example http://localhost:8000/playlist/deleteAlbumFromPlaylist
 */
router.put(
  "/deleteAlbumFromPlaylist",
  authentication.loginRequired,
  deleteAlbumOnPlaylist
);

/* ----------------------------- Delete playlist ---------------------------- */
/**
 * @route DELETE api/deletePlaylist
 * @description create new Playlist
 * @access loginRequired
 * @example http://localhost:8000/playlist/deletePlaylist/63b38e1743c84446d10e8f20
 */
router.delete(
  "/deletePlaylist/:_id",
  authentication.loginRequired,
  validators.validate([
    param("_id").exists().isString().custom(validators.checkObjectId),
  ]),
  deletePlaylistById
);

module.exports = router;
