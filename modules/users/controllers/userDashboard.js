const mongoose = require("mongoose");
const usersModel = require("../../../models/users.model");
const transactionsModel = mongoose.model("transactions");

const userDashboard = async (req, res) => {
  console.log(req.accessToken);

  const usersModel = mongoose.model("users");

  const getUser = await usersModel
    .findOne({ _id: req.accessToken._id })
    // .select("name email balance createdAt updatedAt -_id");
    .select("-password");

  const transactions = await transactionsModel
    .find({
      user_id: req.accessToken._id,
    })
    .sort("-createdAt") // descending order -createdAt
    .limit(5); // 5 last transactions

  res.status(200).json({
    status: "success",
    data: getUser,
    transactions,
  });
};

module.exports = userDashboard;
