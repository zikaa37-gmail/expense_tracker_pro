const mongoose = require("mongoose");

const getTransactions = async (req, res) => {
  const {} = req.body;

  const transactionsModel = mongoose.model("transactions");

  const transactions = await transactionsModel.find({
    user_id: req.accessToken._id,
    ...req.query, // handling query params
  });

  res.status(200).json({
    status: "success",
    data: transactions,
  });
};

module.exports = getTransactions;
