import React from 'react';

export default function Header({ isAuthenticated, userEmail, onLogout }) {
    return (
        <header>
            <div className="logo">
                <h1>Shopping Cart</h1>
            </div>

            <div className="user-info">
                {isAuthenticated && (
                    <div id="user-email">
                        Welcome, <span id="email-display">{userEmail}</span>
                    </div>
                )}

                <div className="auth-buttons">
                    {!isAuthenticated ? (
                        <button id="login-btn" className="btn btn-outline" onClick={() => window.location.href = '/login'}>
                            Login
                        </button>
                    ) : (
                        <button id="logout-btn" className="btn btn-outline" onClick={onLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}