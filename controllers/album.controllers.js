const { sendResponse, AppError } = require("../helpers/utils.js");
const Album = require("../models/Album.js");

/* ------------------------------- create Album ------------------------------ */
const albumController = {};
albumController.createAlbum = async (req, res, next) => {
  const userId = req.userId;
  console.log("userId", userId);
  // if user.role = admin => created
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
  let { limit, page, filter } = req.query;
  page = parseInt(page) || 1;

  // page = JSON.parse(page) || 1;
  limit = parseInt(limit) || 10;
  let newFilter = {};
  if (filter) newFilter = JSON.parse(filter);
  let offset = limit * (page - 1);

  try {
    let listOfAlbum = await Album.find(newFilter)
      .populate("artistRef", "artistName")
      .limit(limit)
      .skip(offset);
    // listOfAlbum = listOfAlbum.slice(offset, offset + limit);

    const countDocuments = await Album.countDocuments(newFilter);

    sendResponse(
      res,
      200,
      true,
      {
        data: listOfAlbum,
        total: countDocuments,
        limit: limit,
        page: page,
      },
      null,
      "Find List of Album Success"
    );
  } catch (err) {
    next(err);
  }
};

/* ---------------------------- get single Album ---------------------------- */

albumController.getOneAlbum = async (req, res, next) => {
  const albumId = req.params;
  console.log("albumId", albumId);
  try {
    const singleAlbum = await Album.findById(albumId);
    sendResponse(
      res,
      200,
      true,
      { data: singleAlbum },
      null,
      "find Single Album success"
    );
  } catch (error) {
    next(error);
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
  const targetId = req.userId;
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
  } catch (err) {
    next(err);
  }
};

/* ---------------------- get similar genre of an album --------------------- */
// getSimilarGenre
// const newStringArray = stringArray.map((e) => {
//   return /^ + e + /;
// });

albumController.getSimilarGenre = async (req, res, next) => {
  try {
    let { filter, limit, page } = req.query;
    filter = JSON.parse(filter);
    const { genre } = filter;
    let stringArray = genre.split(" ");
    stringArray.push(genre);
    stringArray = stringArray.map((data) => {
      return new RegExp(data);
    });
    const where = { genre: { $in: stringArray } };
    // stringArray [ 'Progressive', 'Rock', 'Progressive Rock' ]
    const allAlbum = await Album.find(where)
      .limit(limit)
      .skip(limit * (page - 1));
    const countDocuments = await Album.countDocuments(where);
    sendResponse(
      res,
      200,
      true,
      { data: allAlbum, total: countDocuments },
      null,
      "get album Similar genre success"
    );
  } catch (err) {
    next(err);
  }
};

/* -------------------- get all album of the same artist -------------------- */

albumController.getAlbumOfArtist = async (req, res, next) => {
  try {
    let query = req.params;
    // let query = "\b(rock|progressive rock)\b";
    // console.log("query", typeof query);
    // let newFilter = {};
    const allAlbum = await Album.find({ artistRef: query.id });
    sendResponse(
      res,
      200,
      true,
      { data: allAlbum },
      null,
      "get albums of the same artists success"
    );
  } catch (err) {
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

// const [listAllAlbum, setListAllAlbum] = useState([]); //array rong
// const [albumRating, setAlbumRating] = useState(null); //object rỗng

// useEffect(() => {
//   if (listAlbum && listAlbum.length > 0) {
//     // neu listALbum ton tai va co gia tri
//     setListAllAlbum(listAlbum);
//     if (listAllAlbum[listAllAlbum.length - 1]) {
//       const rate = listAllAlbum[listAllAlbum.length - 1];
//       //neu rate ton tai va data.data cua no co ton tai va data dau tien co gia tri
//       if (rate?.data?.data && rate?.data?.data[0]) {
//         setAlbumRating(rate?.data?.data[0]);
//       }
//     }
//   }
// }, [listAlbum]);
