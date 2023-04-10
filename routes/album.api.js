const express = require("express");
const router = express.Router();
const authentication = require("../helpers/middlewares/authentication.js");
const validators = require("../helpers/middlewares/validators.js");
const { body, param, query } = require("express-validator");
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
 * @API http://localhost:8000/album?limit=2&page=2
 */
router.get("/", getAllAlbums);

/* ------------------------------ get one album ----------------------------- */
/**
 * @route GET api/album
 * @description get list of albums
 * @access public
 * @API http://localhost:8000/album/findAlbumById/63a3df92aba421e4cd7301bb
 */
router.get(
  ":_id",
  validators.validate([
    param("_id").exists().isString().custom(validators.checkObjectId),
  ]),
  getOneAlbum
);

/* --------------------------------- Create --------------------------------- */
/**
 * @route POST api/album
 * @description create new album
 * @access loginRequired
 *  @body   {
    "ranking": 102 (higher than 101),
    "album": "Brief enquiry",
    "artistName": "the 1975",
    "releaseDate": "Jan 2023"
    "genre": "Rock",
  },
 */
router.post(
  "/",
  validators.validate([
    body("ranking", "Invalid ranking").exists().notEmpty(),
    body("album", "Invalid album").exists(),
    body("artistName", "Invalid artistName").exists().notEmpty(),
    body("releaseDate", "Invalid releaseDate").exists().notEmpty(),
    body("genre", "Invalid genre").exists().notEmpty(),
  ]),
  authentication.loginRequired,
  createAlbum
);
/* --------------------------------- Update --------------------------------- */
/**
 * @route PUT api/album
 * @description update infor of an album
 * @access loginRequired
*  @body   {
    "ranking": 102 (higher than 101),
    "album": "Brief enquiry",
    "artistName": "the 1975",
    "releaseDate": "Jan 2023"
    "genre": "Rock",
  },
 */
router.put(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  updateAlbumById
);
/* --------------------------------- Delete --------------------------------- */
/**
 * @route DELETE api/album
 * @description delete an album
 * @access loginRequired
*  @body   {
    "ranking": 102 (higher than 101),
    "album": "Brief enquiry",
    "artistName": "the 1975",
    "releaseDate": "Jan 2023"
    "genre": "Rock",  
  },
 */
router.delete(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  deleteAlbumById
);

/* --------------------- get albums with similar genres --------------------- */
/**
 * @route GET api/album/similarGenre
 * @description get albums with similar genres
 * @access public
 */

router.get(
  "/similarGenre",
  validators.validate([query("genre").exists().isString()]),
  getSimilarGenre
);

/* ---------------------- get albums of the same artist --------------------- */
/**
 * @route GET api/album/albumOfArtist/:id
 * @description get albums with similar artist
 * @access public
 */
router.get(
  "/albumOfArtist/:id",
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  getAlbumOfArtist
);

/* -------------------------------------------------------------------------- */
/*                                extra routes                                */
/* -------------------------------------------------------------------------- */
/* ------------------------------- update many ------------------------------ */
/**
 * @route PUT api/album/updateMany/:id
 * @description create new album
 * @access public
 * @example put http://localhost:8000/album/updateMany/63a3ee99aba421e4cd730226
// req.body: {"artistName":"Radiohead"}
 */
router.put(
  "/updateMany/:id",
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  updateManyAlbum
);

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
