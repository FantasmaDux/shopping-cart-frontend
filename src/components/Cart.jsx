import React, { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;


export default function Cart({ token }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) loadCart();
    }, [token]);

    async function loadCart() {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/carts`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const cart = await response.json();

            const cartData = cart.data || cart;
            const items = cartData.items || cartData.cartItems || [];
            setCartItems(items);
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleCheckout() {
        try {
            const response = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                alert('Order created successfully!');
                loadCart();
            } else {
                const error = await response.json();
                alert('Error: ' + (error.message || 'Failed to create order'));
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Error creating order');
        }
    }

    if (!token) return null;

    return (
        <section id="cart-section">
            <h2>🛒 Your Cart</h2>
            <div id="cart-items">
                {loading ? (
                    <p>Loading cart...</p>
                ) : cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <p>{item.product?.name || item.productName} - ${item.price || '0.00'} x {item.quantity || 1}</p>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty</p>
                )}
            </div>
            {cartItems.length > 0 && (
                <button id="checkout-btn" className="btn btn-primary" onClick={handleCheckout}>
                    Checkout
                </button>
            )}
        </section>
    );
}