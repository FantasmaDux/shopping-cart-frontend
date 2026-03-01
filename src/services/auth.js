const API_URL = import.meta.env.VITE_API_URL;

// Функция логина
export async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            const token = data.data?.token || data.token;
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('userEmail', email);
                return { success: true, token };
            }
            return { success: false, error: 'No token received' };
        } else {
            return { success: false, error: data.message || 'Login failed' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Функция выхода
export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.location.href = '/';
}

// Проверка авторизации
export function isAuthenticated() {
    return !!localStorage.getItem('token');
}

// Получение email пользователя
export function getUserEmail() {
    return localStorage.getItem('userEmail') || '';
}

// Добавление в корзину
export async function addToCart(productId) {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Please login to add items to cart!');
        window.location.href = '/login';
        return false;
    }

    try {
        const url = `${API_URL}/cartItems/item?productId=${productId}&quantity=1`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            alert('Added to cart!');
            return true;
        } else {
            const error = await response.json();
            alert('Error: ' + (error.message || 'Failed to add to cart'));
            return false;
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Error adding to cart');
        return false;
    }
}