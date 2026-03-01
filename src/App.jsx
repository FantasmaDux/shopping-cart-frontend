import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AuthBanner from './components/AuthBanner';
import LoginPage from './pages/LoginPage';
import { isAuthenticated, getUserEmail, logout as authLogout, addToCart } from './services/auth';
import './styles/App.css';

function App() {
    const [auth, setAuth] = useState({
        isAuth: isAuthenticated(),
        userEmail: getUserEmail()
    });

    const handleLogout = () => {
        authLogout();
        setAuth({ isAuth: false, userEmail: '' });
    };

    const handleAddToCart = async (productId) => {
        const success = await addToCart(productId);
        if (success) {
            // Опционально обновить корзину
            window.location.reload();
        }
    };

    useEffect(() => {
        // Проверка токена при загрузке
        const checkAuth = () => {
            setAuth({
                isAuth: isAuthenticated(),
                userEmail: getUserEmail()
            });
        };

        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    return (
        <Router>
            <div className="container">
                <Header
                    isAuthenticated={auth.isAuth}
                    userEmail={auth.userEmail}
                    onLogout={handleLogout}
                />

                <Routes>
                    <Route path="/" element={
                        <>
                            <ProductList onAddToCart={handleAddToCart} />
                            <Cart token={localStorage.getItem('token')} />
                            <AuthBanner isAuthenticated={auth.isAuth} />
                        </>
                    } />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;