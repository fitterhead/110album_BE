const express = require("express");
const router = express.Router();
const {
  deletePlaylistById,
  createPlaylist,
  updatePlaylistById,
  getAllPlaylists,
} = require("../controllers/playlist.controllers.js");

/* ---------------------------------- Read ---------------------------------- */
/**
 * @route GET api/Playlist
 * @description get list of Playlists
 * @access public
 */
router.get("/", getAllPlaylists);
/* --------------------------------- Create --------------------------------- */
/**
 * @route POST api/Playlist
 * @description create new Playlist
 * @access public
 */
router.post("/", createPlaylist);
/* --------------------------------- Update --------------------------------- */
/**
 * @route PUT api/Playlist
 * @description create new Playlist
 * @access public
* @example http://localhost:8000/playlist/63a7dcd9104af1c06b8b2482
            req.body: {"_id":"63a3df92aba421e4cd7301b7"}
 */
router.put("/:id", updatePlaylistById);
/* --------------------------------- Delete --------------------------------- */
/**
 * @route DELETE api/Playlist
 * @description create new Playlist
 * @access public
 */
router.delete("/:id", deletePlaylistById);

module.exports = router;
