const jwt = require('jsonwebtoken');

function createToken(tokenDataObject) {
  const token = jwt.sign(
    tokenDataObject, process.env.JWT_SECRET, { expiresIn: '7d' }
  )

  return token;
}

module.exports = createToken;