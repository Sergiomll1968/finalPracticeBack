// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

function unauthorized(res) {
  res.status(401);
  res.json('Unauthorized');
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    // const token = authHeader.split(' ')[1];
    const token = authHeader;
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json('Token is not valid!');
      req.user = user;
      next();
    });
  }
  return unauthorized(res);
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    }
    return unauthorized(res);
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    }
    return unauthorized(res);
  });
};

export {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
