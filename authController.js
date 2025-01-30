// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const signUp = async (req, res) => {
//     const { name, email, password, phone } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 12);
//         const user = new User({
//             name,
//             email,
//             password: hashedPassword,
//             phone
//         });
//         await user.save();

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(201).json({ user, token });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ user, token });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// module.exports = { signUp, login };


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signUp = async (req, res) => {
    const { name, email, password, phone, role } = req.body;

    console.log("signUp successfull");

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create a new user
        const user = new User({
            name,
            email,
            password, // Password will be hashed by the pre-save middleware
            phone,
            role, // Optional: Pass the role if provided in the request
        });

        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            user: { id: user._id, name, email, role: user.role },
            token,
        });
    } catch (error) {
        console.error('Error during signup:', error);

        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        res.status(500).json({ message: 'Error during signup. Please try again.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ user: { id: user._id, name: user.name, email: user.email }, token });
    } catch (error) {
        res.status(500).json({ message: 'Error during login. Please try again.' });
    }
};

module.exports = { signUp, login };
