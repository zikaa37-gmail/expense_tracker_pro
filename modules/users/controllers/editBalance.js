const mongoose = require("mongoose");
const validator = require("validator");

const editBalance = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { balance } = req.body;

  console.log("BALANCE", balance);

  if (balance === undefined || balance === null || isNaN(balance)) {
    throw "Balance is required!";
  }

  if (balance < 0) throw "Balance must not be negative number!";
  if (!validator.isNumeric(balance.toString()))
    throw "Balance must be a valid number!";

  await usersModel.updateOne(
    { _id: req.accessToken._id },
    { balance },
    { runValidators: true }
  );

  res.status(200).json({
    status: "success",
    message: "Balance updated successfully!",
  });
};

module.exports = editBalance;
