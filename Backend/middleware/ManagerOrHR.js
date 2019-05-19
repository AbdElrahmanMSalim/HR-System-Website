module.exports = function(req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden

  //todo change this to role
  if (req.user.role !== "Manager" || req.user.role !== "HR")
    return res.status(403).send("Access denied.");
  console.log(req.user.role);
  next();
};
