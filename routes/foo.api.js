const express = require("express");
const router = express.Router();
const {
  createFoo,
  getAllFoos,
  updateFooById,
  deleteFooById,
} = require("../controllers/foo.controllers.js");

//Read
/**
 * @route GET api/foo
 * @description get list of foos
 * @access public
 */
router.get("/", getAllFoos);
//Create

//Update
//Delete

module.exports = router;
