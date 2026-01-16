const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAccessToken = (body) => {
  return jwt.sign(body, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY_DAY,
  });
};

exports.getRefreshToken = (body) => {
  return jwt.sign(body, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY_DAY,
  });
};

exports.getOtp = () => {
  return Math.floor(
    Math.pow(10, 6 - 1) +
      Math.random() * (Math.pow(10, 6) - Math.pow(10, 6 - 1) - 1)
  );
};


