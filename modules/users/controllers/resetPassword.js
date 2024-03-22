const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, new_password, reset_code } = req.body;

  console.log(req.body);

  if (!email) throw "Email is required!";
  if (!reset_code) throw "Reset code is required!";
  if (!new_password) throw "Password is required!";
  if (new_password.length < 5)
    throw "Password must be at least 5 characters long!";

  const getUserWithResetCode = await usersModel.findOne({ email, reset_code });

  if (!getUserWithResetCode) throw "Reset code does not match!";

  const hashedPassword = await bcrypt.hashSync(new_password, 12);

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      password: hashedPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );

  await emailManager(
    email,
    "Your password reset successfully! If you have not done it, please contact support",
    "<h1>Your password reset successfully!</h1> <p>If you have not done it, please contact support</p>",
    "Password reset successfully!"
  );

  res.status(200).json({
    status: "success",
    message: "Password reset successfully!",
  });
};

module.exports = resetPassword;
