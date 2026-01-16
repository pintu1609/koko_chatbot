const jwt = require("jsonwebtoken");
const { clientHandler } = require("./response-handler");
const { useErrorHandler } = require("./error-handler");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return clientHandler({}, res, "No token provided", 401);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    useErrorHandler(err, req, res);
  }
};

exports.authorizeRole =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return clientHandler({}, res, "Forbidden: Insufficient access", 403);
    }
    next();
  };
