// // const express = require('express');
// // const router = express.Router();
// // const { applyForLoan } = require('../controllers/loanController');
// // const authMiddleware = require('../middleware/authMiddleware');

// // // POST route to apply for a loan
// // router.post('/apply', authMiddleware, applyForLoan);

// // module.exports = router;




// // routes/loanRouter.js
// const express = require('express');
// const router = express.Router();
// const LoanApplicationForm = require('../models/LoanApplicationForm');  // Import the LoanApplicationForm model

// // POST route to apply for a loan
// router.post('/apply', async (req, res) => {
//   try {
//     const { name, email, phone, age, address, monthlyIncome, requestedLoanAmount, tenure, cibilScore, debtToIncomeRatio, annualIncome, employerName, designation } = req.body;

//     // Assuming the user is authenticated and `req.user.id` is set
//     const loanApplicationForm = new LoanApplicationForm({
//       user: req.user.id, // Link to the user who is applying for the loan
//       personalDetails: { name, email, phone, age, address },
//       financialDetails: { monthlyIncome, requestedLoanAmount, tenure, cibilScore, debtToIncomeRatio, annualIncome },
//       employerDetails: { employerName, designation },
//     });

//     await loanApplicationForm.save();

//     res.status(201).json({ message: 'Loan application submitted successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error submitting loan application' });
//   }
// });

// // GET route to fetch all loan applications (Admin)
// router.get('/applications', async (req, res) => {
//   try {
//     const applications = await LoanApplicationForm.find().populate('user', 'name email'); // Populate user info
//     res.status(200).json(applications);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching loan applications' });
//   }
// });

// // PUT route to update loan application status (Admin)
// router.put('/applications/:id', async (req, res) => {
//   try {
//     const { status } = req.body;
//     const application = await LoanApplicationForm.findByIdAndUpdate(req.params.id, { status }, { new: true });

//     if (!application) {
//       return res.status(404).json({ message: 'Loan application not found' });
//     }

//     res.status(200).json({ message: 'Loan application status updated successfully', application });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating loan application status' });
//   }
// });

// module.exports = router;



// backend/routes/loanRouter.js
const express = require('express');
const router = express.Router();
const { applyLoan } = require('../controllers/loanController');  // Ensure this path is correct

// POST route to apply for a loan
router.post('/apply', applyLoan);

module.exports = router;  // Export the router
