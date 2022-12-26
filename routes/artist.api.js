const express = require("express");
const router = express.Router();
const {
  deleteArtistById,
  createArtist,
  updateArtistById,
  getAllArtists,
} = require("../controllers/artist.controllers.js");

/* ---------------------------------- Read ---------------------------------- */
/**
 * @route GET api/artist
 * @description get list of artists
 * @access public
 */
router.get("/", getAllArtists);
/* --------------------------------- Create --------------------------------- */
/**
 * @route POST api/artist
 * @description create new artist
 * @access public
 */
router.post("/", createArtist);
/* --------------------------------- Update --------------------------------- */
/**
 * @route PUT api/artist
 * @description create new artist
 * @access public
 */
router.put("/:id", updateArtistById);
/* --------------------------------- Delete --------------------------------- */
/**
 * @route DELETE api/artist
 * @description create new artist
 * @access public
 */
router.delete("/:id", deleteArtistById);

module.exports = router;
