const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check karte hain ki headers mein 'Authorization' hai aur wo 'Bearer' se shuru hota hai
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // "Bearer <token>" string me se sirf token ko nikalna
      token = req.headers.authorization.split(' ')[1];

      // Token ko verify karna using hamara secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Token me chhupe user ki ID se database me user dhundna
      // `.select('-password')` password ko result me aane se rokta hai (security)
      req.user = await User.findById(decoded.id).select('-password');

      // Sab sahi hai, aage badho (next controller ki taraf)
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // Agar token mila hi nahi
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };