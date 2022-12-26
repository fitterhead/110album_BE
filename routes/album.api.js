const express = require("express");
const router = express.Router();
const {
  getAllGenre,
  deleteAlbumById,
  createAlbum,
  updateAlbumById,
  getAllAlbums,
  updateManyAlbum,
} = require("../controllers/album.controllers.js");

/* ---------------------------------- Read ---------------------------------- */
/**
 * @route GET api/album
 * @description get list of albums
 * @access public
 */
router.get("/", getAllAlbums);
/* --------------------------------- Create --------------------------------- */
/**
 * @route POST api/album
 * @description create new album
 * @access public
 */
router.post("/", createAlbum);
/* --------------------------------- Update --------------------------------- */
/**
 * @route PUT api/album
 * @description create new album
 * @access public
 */
router.put("/:id", updateAlbumById);
/* --------------------------------- Delete --------------------------------- */
/**
 * @route DELETE api/album
 * @description create new album
 * @access public
 */
router.delete("/:id", deleteAlbumById);

/* ------------------------------- update many ------------------------------ */
/**
 * @route PUT api/album/updateMany/:id
 * @description create new album
 * @access public
 * @example put http://localhost:8000/album/updateMany/63a3ee99aba421e4cd730226
// req.body: {"artistName":"Radiohead"}
 */
router.put("/updateMany/:id", updateManyAlbum);

/* ---------------------------- get Artist genre ---------------------------- */
/**
 * @route GET api/album/getAritstGenre
 * @description get All genre of Artist
 * @access public
 * @example
 * @body {"artistNAme":"Radiohead"}
 */
router.get("/getAllGenre", getAllGenre);

/* --------------------------------- export --------------------------------- */
module.exports = router;
