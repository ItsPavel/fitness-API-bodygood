require("dotenv").config();

module.exports = {
  secretKey: process.env.SECRET_JWT_KEY,
};
