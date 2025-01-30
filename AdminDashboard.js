// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const { data } = await axios.get('/api/admin/applications', {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
                setApplications(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchApplications();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            await axios.put(`/api/admin/applications/${id}`, { status }, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            setApplications(applications.map(app => (app._id === id ? { ...app, status } : app)));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Loan Amount</th>
                        <th>Tenure</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map(app => (
                        <tr key={app._id}>
                            <td>{app.personalDetails.name}</td>
                            <td>{app.financialDetails.requestedLoanAmount}</td>
                            <td>{app.financialDetails.tenure}</td>
                            <td>{app.status}</td>
                            <td>
                                <button onClick={() => updateStatus(app._id, 'approved')}>Approve</button>
                                <button onClick={() => updateStatus(app._id, 'rejected')}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
