const mongoose = require("mongoose");
const validator = require("validator");
const usersModel = require("../../../models/users.model");

const deleteTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");

  const { transaction_id } = req.params;

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Invalid transaction id!";

  const getTransaction = await transactionModel.findOne({
    _id: transaction_id,
  });

  if (!getTransaction) throw new Error("Transaction not found!");

  if (getTransaction.transaction_type === "income") {
    usersModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: { balance: getTransaction.amount * -1 },
      },
      { runValidators: true }
    );
  } else {
    usersModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: { balance: getTransaction.amount },
      },
      { runValidators: true }
    );
  }

  await transactionModel.deleteOne({ _id: transaction_id });

  res.status(200).json({
    status: "success",
    message: "Transaction deleted successfully!",
  });
};

module.exports = deleteTransaction;
