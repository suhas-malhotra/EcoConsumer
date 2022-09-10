const jwt = require("jsonwebtoken");
//middleware for admin token
function verifyTokenUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN_USER, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
//middleware for student token
function verifyTokenDealer(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader;
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN_DEALER, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { verifyTokenUser, verifyTokenDealer };
