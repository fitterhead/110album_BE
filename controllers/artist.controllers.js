const { sendResponse, AppError } = require("../helpers/utils.js");
const Artist = require("../models/Artist.js");

/* ------------------------------- create Artist ------------------------------ */
const artistController = {};
artistController.createArtist = async (req, res, next) => {
  //in real project you will getting info from req
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
  const filter = {};

  try {
    const listOfArtist = await Artist.find(filter);
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

/* ------------------------------- update Artist ------------------------------ */
artistController.updateArtistById = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication
  //you will also get updateInfo from req
  // empty target and info mean update nothing
  const targetId = null;
  const updateInfo = "";

  //options allow you to modify query. e.g new true return lastest update of data
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
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication

  // empty target mean delete nothing
  const targetId = null;
  //options allow you to modify query. e.g new true return lastest update of data
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
