const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
  // const token = req.headers['authorization']?.split(' ')[1] || req.query.token || req.cookies.token;
  const token = req.cookies.jwt_token;
  if (!token) return res.status(401).json({ message: 'Token is required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

function admin (req, res, next) {
  const user = req.user;
  if (user.role !== 'admin' && user.role !== 'owner') {
    return res.status(403).json({ message: 'permission ungranted' }) ;
  } 
  next();
}

function me (req, res, next) {
  const {id: tokenId } = req.user;
  const { id } = req.body;

  if (tokenId !== id) return res.status(401).json( { message: 'permission is forbidden'});
  next();
}

module.exports = {
  checkAuth,
  admin,
  me
};