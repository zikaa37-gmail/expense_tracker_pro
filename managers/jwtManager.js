const jsonwebtoken = require("jsonwebtoken");

const jwtManager = (user) => {
  const accessToken = jsonwebtoken.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.jwt_secret,
    {
      expiresIn: "30d",
    }
  );
  return accessToken;
};

module.exports = jwtManager;
