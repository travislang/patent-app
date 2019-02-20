const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    if (!req.user.active) {
      res.sendStatus(403);
    } else {
      next();
    }
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

const rejectIfNotAdmin = (req, res, next) => {
  if (req.user && req.user.is_admin && req.user.active) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthenticated, rejectIfNotAdmin };
