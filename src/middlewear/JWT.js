const jwt = require("jsonwebtoken");

// // accessTokens
// function generateAccessToken(user) {
//   return;
//   jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
// }

// // refreshTokens
// let refreshTokens = [];
// function generateRefreshToken(user) {
//   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: "20m",
//   });
//   refreshTokens.push(refreshToken);
//   return refreshToken;
// }


const token = jwt.sign(
  { user_id: user._id, email },
  process.env.TOKEN_KEY,
  {
    expiresIn: "2h",
  }
);

