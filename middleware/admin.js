
  module.exports = function (req, res, next){
    // 401 Unauthorized -- user tries to access a protected resource w/o a valid jwt. User is given a chance to retry and send a valid token.
    
    // 403 Forbidden -- user has a valid token. Don't try again, you cannot access this resource. 

    if(!req.user.isAdmin) return res.status(403).send("Access denied.");
    next(); // pass control to the next middleware function. In this case, it is the route handler.
  };