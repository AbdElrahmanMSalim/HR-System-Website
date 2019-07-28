module.exports = function(req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden

  //todo change this to role
  if (req.user.role !== "Employee")
    return res.status(403).send("Access denied.");

  next();
};
