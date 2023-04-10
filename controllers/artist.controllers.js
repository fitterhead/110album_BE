const { sendResponse, AppError } = require("../helpers/utils.js");
const Artist = require("../models/Artist.js");

/* ------------------------------- create Artist ------------------------------ */
const artistController = {};
artistController.createArtist = async (req, res, next) => {
  const input = req.body;
  // const input = {
  //   artistName: "Radiohead",
  //   genre: "Rock",
  //   biography: "insert some text here"
  // };
  try {
    //always remember to control your inputs
    if (!input) throw new AppError(402, "Bad Request", "Create Artist Error");
    //mongoose query
    const created = await Artist.create(input);
    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "add new Artist Success"
    );
  } catch (err) {
    next(err);
  }
};

/* ------------------------------ get all Artist ------------------------------ */
artistController.getAllArtists = async (req, res, next) => {
  let { page, limit, filter } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  let newFilter = {};
  if (filter) newFilter = JSON.parse(filter);
  let offset = limit * (page - 1);

  try {
    let listOfArtist = await Artist.find(newFilter);
    listOfArtist = listOfArtist.slice(offset, offset + limit);
    sendResponse(
      res,
      200,
      true,
      { data: listOfArtist },
      null,
      "Find List of Artist Success"
    );
  } catch (err) {
    next(err);
  }
};

/* ----------------------------- get one artist ----------------------------- */
artistController.getOneArtist = async (req, res, next) => {
  const albumId = req.params;
  console.log("albumId", albumId);
  try {
    const singleArtist = await Artist.findById(albumId);
    sendResponse(
      res,
      200,
      true,
      { data: singleArtist },
      null,
      "find singleArtist success"
    );
  } catch (error) {
    next(error);
  }
};

/* ------------------------------- update Artist ------------------------------ */
artistController.updateArtistById = async (req, res, next) => {

  const targetId = null;
  const updateInfo = "";


  const options = { new: true };
  try {
    //mongoose query
    const updated = await Artist.findByIdAndUpdate(
      targetId,
      updateInfo,
      options
    );

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Update Artist success"
    );
  } catch (err) {
    next(err);
  }
};

/* ------------------------------- delete Artist ------------------------------ */
artistController.deleteArtistById = async (req, res, next) => {

  const targetId = null;

  const options = { new: true };
  try {
    //mongoose query
    const updated = await Artist.findByIdAndDelete(targetId, options);

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Delete Artist success"
    );
  } catch (err) {
    next(err);
  }
};
/* --------------------------------- export --------------------------------- */

module.exports = artistController;
