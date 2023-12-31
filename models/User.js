const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const subdocumentSchema = mongoose.Schema({
  reference_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Album",
  },
  description: { type: String },
  price: { type: Number, default: 19 },
  amount: { type: Number, default: 1 },
});

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
    isAdmin: { type: Boolean },
    cart: [subdocumentSchema],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.password;
  return user;
};

/* ----------------------- funtion creates accessToken ---------------------- */
userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
