const authorize = (roles = []) => {
  // roles param can be a single role string (e.g., 'admin') or an array of roles (e.g., ['admin', 'user'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // middleware to verify user role
    (req, res, next) => {
      if (!roles.length || roles.includes(req.user.rol)) {
        // role is authorized
        return next();
      }

      // role is not authorized
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
  ];
};

module.exports = authorize;
