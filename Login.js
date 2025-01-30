import React, { useState } from 'react';
import apiService from '../../utils/apiService';
import './Auth.css';

const Login = ({ history }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiService.post('/auth/login', formData);
            if (response?.data?.token && response?.data?.user) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                history.push('/user-dashboard');
            } else {
                throw new Error('Login response is missing data');
            }
        } catch (error) {
            setErrors({ form: error.response?.data?.message || error.message || 'Login failed' });
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title">Login</h2>
                {['email', 'password'].map((field) => (
                    <div key={field} className="form-group">
                        <input
                            type={field === 'password' ? 'password' : 'email'}
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={formData[field]}
                            onChange={handleChange}
                            className="auth-input"
                        />
                        {errors[field] && <div className="error-message">{errors[field]}</div>}
                    </div>
                ))}
                {errors.form && <div className="error-message">{errors.form}</div>}
                <button type="submit" className="auth-button">Login</button>
            </form>
        </div>
    );
};

export default Login;