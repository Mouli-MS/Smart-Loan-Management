import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css'; // Ensure this file contains styles

const UserDashboard = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo) {
            navigate('/login'); // Redirect to login if userInfo is not found
        }
    }, [userInfo, navigate]);

    if (!userInfo) {
        return null; // Render nothing while redirecting
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h1 className="dashboard-title">Welcome, {userInfo.name}!</h1>
                <p className="dashboard-text"><strong>Email:</strong> {userInfo.email}</p>
                <button 
                    className="apply-loan-button" 
                    onClick={() => navigate('/loan-application')} // Redirect to loan application form
                >
                    Apply for Loan
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;
