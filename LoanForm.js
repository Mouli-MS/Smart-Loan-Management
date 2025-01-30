import React, { useState } from 'react';
import axios from 'axios';

const LoanForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        address: '',
        monthlyIncome: '',
        requestedLoanAmount: '',
        tenure: '',
        cibilScore: '',
        debtToIncomeRatio: '',
        annualIncome: '',
        employerName: '',
        employerDesignation: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        try {
            await axios.post('/api/auth/loan', formData, config);
            alert('Thank you for providing your details. Our team will review your eligibility and get back to you shortly.');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="tel"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Monthly Income"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Requested Loan Amount"
                name="requestedLoanAmount"
                value={formData.requestedLoanAmount}
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Tenure"
                name="tenure"
                value={formData.tenure}
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="CIBIL Score"
                name="cibilScore"
                value={formData.cibilScore}
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Debt To Income Ratio"
                name="debtToIncomeRatio"
                value={formData.debtToIncomeRatio}
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Annual Income"
                name="annualIncome"
                value={formData.annualIncome}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Employer Name"
                name="employerName"
                value={formData.employerName}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Employer Designation"
                name="employerDesignation"
                value={formData.employerDesignation}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default LoanForm;