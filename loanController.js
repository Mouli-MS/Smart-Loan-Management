// const LoanApplication = require('../models/LoanApplication');

// const submitLoanApplication = async (req, res) => {
//     try {
//         const {
//             personalDetails,
//             financialDetails,
//             cibilScore,
//             debtToIncomeRatio,
//             annualIncome,
//             employer
//         } = req.body;

//         const application = new LoanApplication({
//             user: req.user.id,
//             personalDetails,
//             financialDetails,
//             cibilScore,
//             debtToIncomeRatio,
//             annualIncome,
//             employer,
//         });

//         await application.save();
//         res.status(201).json(application);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// module.exports = { submitLoanApplication };



const express = require('express');
const LoanApplication = require('../models/LoanApplication');
const router = express.Router();

router.post('/loan-applications', async (req, res) => {
    try {
        const application = new LoanApplication(req.body);
        await application.save();
        res.status(201).json({ message: 'Loan application submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit loan application.' });
    }
});

module.exports = router;
