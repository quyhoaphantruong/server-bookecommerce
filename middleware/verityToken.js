const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) return res.status(401).json("Not verified");
  const token = authorization.split(" ")[1];
  if (!token) return res.status(401).json("Not verified");

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      return res.status(401).json("Not verified");
    }
    req.user = data.id;
    next();
  });
};
module.exports = {
  verifyToken,
};
