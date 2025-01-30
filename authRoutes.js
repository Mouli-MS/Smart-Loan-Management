// const express = require('express');
// const { signUp, login } = require('../controllers/authController');
// const { submitLoanApplication } = require('../controllers/loanController');
// const { protect } = require('../middleware/authMiddleware');

// const router = express.Router();

// router.post('/signup', signUp);
// router.post('/login', login);
// router.post('/loan', protect, submitLoanApplication);

// module.exports = router;

const express = require('express');
const { signUp, login } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

module.exports = router;
