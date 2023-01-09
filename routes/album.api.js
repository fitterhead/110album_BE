const express = require("express");
const router = express.Router();
const authentication = require("../helpers/middlewares/authentication.js");
const {
  getSimilarGenre,
  getAllGenre,
  deleteAlbumById,
  createAlbum,
  updateAlbumById,
  getAllAlbums,
  updateManyAlbum,
  getOneAlbum,
  getAlbumOfArtist,
} = require("../controllers/album.controllers.js");

/* ---------------------------------- Read ---------------------------------- */
/**
 * @route GET api/album
 * @description get list of albums
 * @access public
 *  @API http://localhost:8000/album?limit=2&page=2
 */
router.get("/", getAllAlbums);

/* ------------------------------ get one album ----------------------------- */
/**
 * @route GET api/album
 * @description get list of albums
 * @access public
@API http://localhost:8000/album/findAlbumById/63a3df92aba421e4cd7301bb
 */
router.get("/findAlbumById/:_id", getOneAlbum);

/* --------------------------------- Create --------------------------------- */
/**
 * @route POST api/album
 * @description create new album
 * @access loginRequired
* @body   {
    "ranking": 102,
    "album": "Hay trao cho Anh",
    "artistName": "Son Tung MTP",
    "releaseDate": "Jan 2023"
    "genre": "Pop",
    
  },
 */
router.post("/", authentication.loginRequired, createAlbum);
/* --------------------------------- Update --------------------------------- */
/**
 * @route PUT api/album
 * @description create new album
 * @access loginRequired
 */
router.put("/:id", authentication.loginRequired, updateAlbumById);
/* --------------------------------- Delete --------------------------------- */
/**
 * @route DELETE api/album
 * @description create new album
 * @access loginRequired
 */
router.delete("/:id", authentication.loginRequired, deleteAlbumById);

/* --------------------- get albums with similar genres --------------------- */
/**
 * @route GET api/album/similarGenre
 * @description get albums with similar genres
 * @access public
 */

router.get("/getSimilarGenre", getSimilarGenre);

/* ---------------------- get albums of the same artist --------------------- */
/**
 * @route GET api/album/getAlbumOfArtist/:id
 * @description get albums with similar artist
 * @access public
 */
router.get("/getAlbumOfArtist/:id", getAlbumOfArtist);

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
