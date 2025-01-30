import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router v6
import apiService from '../../utils/apiService'; // Assuming apiService handles API calls
import './Auth.css';

const SignUp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', role: 'user' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Client-side validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors
        const formErrors = validateForm(); // Validate form data
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return; // Stop the submission if validation fails
        }

        try {
            setLoading(true);
            const response = await apiService.post('/auth/signup', formData);
            if (response?.data?.token && response?.data?.user) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                navigate('/user-dashboard'); // Redirect to user dashboard
            } else {
                throw new Error('Signup response is missing data');
            }
        } catch (error) {
            setErrors({ form: error.response?.data?.message || error.message || 'Signup failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title">Sign Up</h2>

                {/* Form Fields */}
                {['name', 'email', 'password', 'phone'].map((field) => (
                    <div key={field} className="form-group">
                        <input
                            type={field === 'password' ? 'password' : 'text'}
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={formData[field]}
                            onChange={handleChange}
                            className="auth-input"
                        />
                        {errors[field] && <div className="error-message">{errors[field]}</div>}
                    </div>
                ))}

                {/* Role selection */}
                <div className="form-group">
                    <label htmlFor="role" className="auth-label">Select Role</label>
                    <select
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="auth-input"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* General form error message */}
                {errors.form && <div className="error-message">{errors.form}</div>}

                {/* Submit button */}
                <button type="submit" className="auth-button" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default SignUp;
