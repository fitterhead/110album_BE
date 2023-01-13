const express = require("express");
const authentication = require("../helpers/middlewares/authentication.js");
const router = express.Router();
const validators = require("../helpers/middlewares/validators.js");
const { body, param } = require("express-validator");
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
router.get(
  "/findArtistById/:_id",
  validators.validate([
    param("_id").exists().isString().custom(validators.checkObjectId),
  ]),
  getOneArtist
);

/* --------------------------------- Create --------------------------------- */
/**
 * @route POST api/artist
 * @description create new artist
 * @access loginRequired
 */
router.post(
  "/",
  validators.validate([
    body("username", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  authentication.loginRequired,
  createArtist
);
/* --------------------------------- Update --------------------------------- */
/**
 * @route PUT api/artist
 * @description update info of Artist
 * @access loginRequired
 */
router.put(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("_id").exists().isString().custom(validators.checkObjectId),
  ]),
  updateArtistById
);
/* --------------------------------- Delete --------------------------------- */
/**
 * @route DELETE api/artist
 * @description delete artist
 * @access loginRequired
 */
router.delete(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("_id").exists().isString().custom(validators.checkObjectId),
  ]),
  deleteArtistById
);

module.exports = router;
