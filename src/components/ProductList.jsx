import React, { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export default function ProductList({ onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        try {
            const response = await fetch(`${API_URL}/products`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            const productsArray = data.data || data.content || data;

            if (!Array.isArray(productsArray)) {
                console.error('Products is not an array:', productsArray);
                setProducts([]);
            } else {
                setProducts(productsArray);
            }
        } catch (error) {
            console.error('Error loading products:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>Loading products...</p>;
    if (error) return <p style={{ color: 'red' }}>Error loading products: {error}</p>;

    return (
        <section id="products-section">
            <h2>🛍️ Our Products</h2>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>{product.description || 'No description'}</p>
                        <p><strong>Price: ${product.price || '0.00'}</strong></p>
                        <button onClick={() => onAddToCart(product.id)} className="btn btn-outline">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}