// const jwt = require('jsonwebtoken');
const User = require('../models/User');

// const protect = async (req, res, next) => {
//     let token;
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.id).select('-password');
//             next();
//         } catch (error) {
//             res.status(401).json({ message: 'Not authorized, token failed' });
//         }
//     }

//     if (!token) {
//         return res.status(401).json({ message: 'Not authorized, no token' });
//     }
// };

// module.exports = { protect };





const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting Bearer token in headers

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'yourSecretKey'); // Your secret key for JWT
        req.user = decoded; // Set user from decoded token
        next(); // Move to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
