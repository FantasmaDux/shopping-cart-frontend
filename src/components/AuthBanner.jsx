import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthBanner({ isAuthenticated }) {
    if (isAuthenticated) return null;

    return (
        <div id="auth-banner" className="banner">
            <p>Login to add items to cart and checkout</p>
            <Link to="/login" className="btn btn-primary">Go to Login</Link>
        </div>
    );
}