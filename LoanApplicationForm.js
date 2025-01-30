// models/LoanApplicationForm.js
const mongoose = require('mongoose');

const loanApplicationFormSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (ensure User schema is correctly set up)
      required: true,
    },
    personalDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      age: { type: Number, required: true },
      address: { type: String, required: true },
    },
    financialDetails: {
      monthlyIncome: { type: Number, required: true },
      requestedLoanAmount: { type: Number, required: true },
      tenure: { type: Number, required: true },
      cibilScore: { type: Number, required: true },
      debtToIncomeRatio: { type: Number, required: true },
      annualIncome: { type: Number, required: true },
    },
    employerDetails: {
      employerName: { type: String, required: true },
      designation: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const LoanApplicationForm = mongoose.model('LoanApplicationForm', loanApplicationFormSchema);

module.exports = LoanApplicationForm;
