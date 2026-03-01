import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', color: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await login(email, password);

            if (result.success) {
                setMessage({ text: 'Login successful! Redirecting...', color: 'green' });
                setTimeout(() => navigate('/'), 1000);
            } else {
                setMessage({ text: result.error, color: 'red' });
            }
        } catch (error) {
            setMessage({ text: 'Error: ' + error.message, color: 'red' });
        }
    };

    return (
        <div className="login-container">
            <h1 style={{ textAlign: 'center' }}>🛒 Shopping Cart</h1>
            <h2 style={{ textAlign: 'center' }}>Login</h2>

            <form id="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Login
                </button>

                {message.text && (
                    <p style={{ textAlign: 'center', marginTop: '15px', color: message.color }}>
                        {message.text}
                    </p>
                )}
            </form>

            <Link to="/" className="back-link">← Back to Products</Link>
        </div>
    );
}