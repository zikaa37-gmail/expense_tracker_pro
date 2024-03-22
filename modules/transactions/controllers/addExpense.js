const mogoose = require("mongoose");
const validator = require("validator");

const addExpense = async (req, res) => {
  const usersModel = mogoose.model("users");
  const transactionsModel = mogoose.model("transactions");

  const { amount, remarks } = req.body;

  if (!amount) throw new Error("Amount is required!");
  if (!validator.isNumeric(amount.toString()))
    throw "Amount must be a valid number!";
  if (!amount < 0) throw "Amount must not negative number!";

  if (!remarks) throw new Error("Remarks is required!");
  if (remarks.length < 5)
    throw new Error("Remarks must be at lest 5 charactrers long!");

  await transactionsModel.create({
    user_id: req.accessToken._id,
    amount,
    transaction_type: "expense",
    remarks,
  });

  await usersModel.updateOne(
    { _id: req.accessToken._id },
    { $inc: { balance: amount * -1 } }, // $inc increment balance by amount
    { runValidators: true }
  );

  res.status(200).json({
    status: "success",
    message: "Expense added  successful!",
  });
};

module.exports = addExpense;
