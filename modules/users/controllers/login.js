const usersModel = require("../../../models/users.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtManager");

const login = async (req, res) => {
  const loginModel = mongoose.model("users");

  const { email, password } = req.body;

  const getUser = await usersModel.findOne({ email: email });
  if (!getUser) throw "Email does not exists";

  const comparePassword = await bcrypt.compare(password, getUser.password);
  if (!comparePassword) throw "Email or password is incorrect";

  const accessToken = jwtManager(getUser);

  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    accessToken,
  });
};

module.exports = login;
