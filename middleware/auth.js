const jwt = require('jsonwebtoken');
const SECRET = 'supersecret';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  } catch {
    res.sendStatus(403);
  }
}

module.exports = authMiddleware;
