const JWT = require("jsonwebtoken");

const secretKey = '$ecretK3y'  // TODO : put it in .env file

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  const token = JWT.sign(payload, secretKey);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secretKey);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};