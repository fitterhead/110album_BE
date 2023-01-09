const express = require("express");
const authentication = require("../helpers/middlewares/authentication.js");
const router = express.Router();
const {
  deleteArtistById,
  createArtist,
  updateArtistById,
  getAllArtists,
  getOneArtist,
} = require("../controllers/artist.controllers.js");

/* ---------------------------------- Read ---------------------------------- */
/**
 * @route GET api/artist
 * @description get list of artists
 * @access public
 */
router.get("/", getAllArtists);

/* ----------------------------- get One Artist ----------------------------- */
/**
 * @route GET api/artist
 * @description get list of artists
 * @access public
 */
router.get("/findArtistById/:_id", getOneArtist);

/* --------------------------------- Create --------------------------------- */
/**
 * @route POST api/artist
 * @description create new artist
 * @access loginRequired
 */
router.post("/", authentication.loginRequired, createArtist);
/* --------------------------------- Update --------------------------------- */
/**
 * @route PUT api/artist
 * @description update info of Artist
 * @access loginRequired
 */
router.put("/:id", authentication.loginRequired, updateArtistById);
/* --------------------------------- Delete --------------------------------- */
/**
 * @route DELETE api/artist
 * @description create new artist
 * @access loginRequired
 */
router.delete("/:id", authentication.loginRequired, deleteArtistById);

module.exports = router;
