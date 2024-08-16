require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  uploadPath: 'uploads/',
};

module.exports = config;
