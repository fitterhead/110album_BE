const { sendResponse, AppError } = require("../helpers/utils.js");
const Album = require("../models/Album.js");

/* ------------------------------- create Album ------------------------------ */
const albumController = {};
albumController.createAlbum = async (req, res, next) => {
  //in real project you will getting info from req
  const input = req.body;
  try {
    //always remember to control your inputs
    if (!input) throw new AppError(402, "Bad Request", "Create Album Error");
    //mongoose query
    const created = await Album.create(input);
    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "add new album Success"
    );
  } catch (err) {
    next(err);
  }
};

/* ------------------------------ get all Album ------------------------------ */
albumController.getAllAlbums = async (req, res, next) => {
  const filter = req.body;
  console.log("req", req);
  // const query = req.query;
  // query ? (filter = { "_id": `${query}` }) : (filter = req.body);

  // example: {"artistName":"Radiohead"}
  try {
    const listOfAlbum = await Album.find(filter).populate(
      "artistRef",
      "artistName"
    );
    // const genreArray = [];
    // listOfAlbum.map((e) => {
    //   genreArray.push(e.genre);
    // });

    // console.log("genreArray",genreArray )

    sendResponse(
      res,
      200,
      true,
      { data: listOfAlbum },
      null,
      "Find List of Album Success"
    );
  } catch (err) {
    next(err);
  }
};

/* ------------------------------- update Album ------------------------------ */
albumController.updateAlbumById = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication
  //you will also get updateInfo from req
  // empty target and info mean update nothing
  // const targetId = null;
  const targetId = req.params;
  const updateInfo = { artistRef: "63a3ee99aba421e4cd730226" };

  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Album.findByIdAndUpdate(
      targetId.id,
      updateInfo,
      options
    );

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Update Album success"
    );
  } catch (err) {
    next(err);
  }
};

/* ------------------------------- delete Album ------------------------------ */
albumController.deleteAlbumById = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication

  // empty target mean delete nothing
  const targetId = null;
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Album.findByIdAndDelete(targetId, options);

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Delete Album success"
    );
  } catch (err) {
    next(err);
  }
};

/* --------------------------- update Many Albums --------------------------- */
albumController.updateManyAlbum = async (req, res, next) => {
  console.log("req", req);
  const artistId = req.params;
  //artist id add artist ref id
  const filter = req.body;
  //filter receives the artist Name
  try {
    const updated = await Album.updateMany(filter, { artistRef: artistId.id });
    //put http://localhost:8000/album/updateMany/63a3ee99aba421e4cd730226
    // req.body: {"artistName":"Radiohead"}
    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "updateMany Album success"
    );
  } catch (error) {
    next(err);
  }
};

/* ----------------------- get all genres of an artist ----------------------- */

albumController.getAllGenre = async (req, res, next) => {
  const filter = req.body;
  // const artistId = req.params;
  // example: {"artistName":"Radiohead"}
  try {
    const listOfGenre = await Album.find(filter, "genre");
    sendResponse(
      res,
      200,
      true,
      { data: listOfGenre },
      null,
      "Find List of Genre Success"
    );
  } catch (err) {
    next(err);
  }
};

/* --------------------------------- export --------------------------------- */

module.exports = albumController;
