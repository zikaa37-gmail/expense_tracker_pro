const mongoose = require("mongoose");
const validator = require("validator");
const usersModel = require("../../../models/users.model");

const editTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");

  const { transaction_id, transaction_type, amount, remarks } = req.body;

  if (!transaction_id) throw "Transaction id is required!";

  if (!transaction_type) throw "Transaction type is required!";
  if (transaction_type !== "income" && transaction_type !== "expense")
    throw "Invalid transaction type! It must be 'income' or 'expense'.";

  if (!amount) throw "Amount is required!";
  if (!validator.isNumeric(amount.toString()))
    throw "Amount must be a valid number!";
  if (!amount < 0) throw "Amount must not negative number!";

  if (!remarks) throw "Remarks is required!";
  if (remarks.length < 5)
    throw new Error("Remarks must be at lest 5 charactrers long!");

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Invalid transaction id!";

  const getTransaction = await transactionModel.findOne({
    _id: transaction_id,
  });

  if (!getTransaction) throw "Transaction not found!";

  if (getTransaction.transaction_type === "income") {
    await usersModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: { balance: getTransaction.amount },
      },
      { runValidators: true }
    );
  } else {
    await usersModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: { balance: getTransaction.amount * -1 },
      },
      { runValidators: true }
    );
  }

  await transactionModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      amount,
      remarks,
      transaction_type,
    },
    { runValidators: true }
  );

  res.status(200).json({
    status: "success",
    message: "Transaction updated successfully!",
  });
};

module.exports = editTransaction;
