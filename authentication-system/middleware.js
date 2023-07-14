// middleware.js

const isAdmin = (req, res, next) => {
    // Check if the user is an admin based on their role
    if (req.user.role === 'admin') {
      next(); // User is an admin, continue to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'Access denied' }); // User is not an admin, return an error response
    }
  };
  
  module.exports = {
    isAdmin,
  };
  