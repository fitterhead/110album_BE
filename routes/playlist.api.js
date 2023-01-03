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

/* ---------------------------------- Read ---------------------------------- */
/**
 * @route GET api/Playlist
 * @description get list of Playlists, find playlist has userRef = userId 
 * @access loginRequired
* @example http://localhost:8000/playlist/63a7dcd9104af1c06b8b2482
            http://localhost:8000/playlist/
 */
router.get("/", authentication.loginRequired, getAllPlaylists);

/* --------------------------- get single playlist -------------------------- */
/**
 * @route GET api/Playlist/:id
 * @description get single playlist
 * @access loginRequired
 * @example http://localhost:8000/playlist/63a7dcd9104af1c06b8b2482
 */
router.get("/:_id", authentication.loginRequired, getSinglePlaylist);

getSinglePlaylist;
/* --------------------------------- Create --------------------------------- */
/**
 * @route POST api/Playlist
 * @description create new Playlist
 * @access public
 */
router.post("/", createPlaylist);
/* --------------------------------- Update --------------------------------- */
/**
 * @route PUT api/addAlbumToPlaylist
 * @description add album to playlist
 * @access public
* @example http://localhost:8000/playlist/addAlbumToPlaylist
            {
  "playlistId": "63b38f9d90a9c03e6f028c46",
  "albumId": "63a3df92aba421e4cd7301bd"
}
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
 * @access public
* @example http://localhost:8000/playlist/deleteAlbumFromPlaylist
 
 */
router.put(
  "/deleteAlbumFromPlaylist",
  authentication.loginRequired,
  deleteAlbumOnPlaylist
);

/* --------------------------------- Delete --------------------------------- */
/**
 * @route DELETE api/Playlist
 * @description create new Playlist
 * @access public
 */
router.delete("/:id", deletePlaylistById);

module.exports = router;
