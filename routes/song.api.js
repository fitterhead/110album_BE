const express = require("express");
const router = express.Router();
const {
  getSong,
  addSong,
  deleteAllSong,
} = require("../controllers/song.controllers.js");
const authentication = require("../helpers/middlewares/authentication.js");
const validators = require("../helpers/middlewares/validators.js");
const { body, param } = require("express-validator");

/* -------------------------------- get song -------------------------------- */
/**
 * @route GET api/Song
 * @description get single song or a list of songs, depend on query
 * @access public
 * @example http://localhost:8000/song
 */
router.get("/", getSong);

/* -------------------------------- add songs ------------------------------- */
/**
 * @route POST api/Song
 * @description add more songs
 * @access loginRequired
 * @example http://localhost:8000/song
 */
router.post("/", authentication.loginRequired, addSong);
/* ---------------------------- delete all songs ---------------------------- */
/**
 * @route DELETE api/Song
 * @description delete all songs
 * @access loginRequired
 * @example http://localhost:8000/song
 */
router.delete("/", authentication.loginRequired, deleteAllSong);

module.exports = router;
