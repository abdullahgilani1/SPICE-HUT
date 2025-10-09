import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  // User signup
  userSignup: async (userData) => {
    return api.post('/auth/signup/user', userData);
  },

  // Admin signup
  adminSignup: async (adminData) => {
    return api.post('/auth/signup/admin', adminData);
  },

  // Login
  login: async (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  // Logout
  logout: async () => {
    return api.post('/auth/logout');
  },

  // Get profile
  getProfile: async () => {
    return api.get('/auth/profile');
  },
};

// Menu API (for future use)
export const menuAPI = {
  // Get all menu items
  getMenuItems: async () => {
    return api.get('/menu');
  },

  // Get menu items by category
  getMenuByCategory: async (category) => {
    return api.get(`/menu/category/${category}`);
  },

  // Get single menu item
  getMenuItem: async (id) => {
    return api.get(`/menu/${id}`);
  },
};

// Order API (for future use)
export const orderAPI = {
  // Create order
  createOrder: async (orderData) => {
    return api.post('/orders', orderData);
  },

  // Get user orders
  getUserOrders: async () => {
    return api.get('/orders');
  },

  // Get order by ID
  getOrder: async (id) => {
    return api.get(`/orders/${id}`);
  },

  // Update order status (admin only)
  updateOrderStatus: async (id, status) => {
    return api.patch(`/orders/${id}/status`, { status });
  },
};

// Customer API (for future use)
export const customerAPI = {
  // Update profile
  updateProfile: async (profileData) => {
    return api.patch('/customers/profile', profileData);
  },

  // Add address
  addAddress: async (addressData) => {
    return api.post('/customers/addresses', addressData);
  },

  // Update address
  updateAddress: async (addressId, addressData) => {
    return api.patch(`/customers/addresses/${addressId}`, addressData);
  },

  // Delete address
  deleteAddress: async (addressId) => {
    return api.delete(`/customers/addresses/${addressId}`);
  },
};

// Admin API (for future use)
export const adminAPI = {
  // Get all customers
  getCustomers: async () => {
    return api.get('/admin/customers');
  },

  // Get all orders
  getOrders: async () => {
    return api.get('/admin/orders');
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    return api.get('/admin/dashboard/stats');
  },

  // Update menu item
  updateMenuItem: async (id, menuData) => {
    return api.patch(`/admin/menu/${id}`, menuData);
  },

  // Create menu item
  createMenuItem: async (menuData) => {
    return api.post('/admin/menu', menuData);
  },

  // Delete menu item
  deleteMenuItem: async (id) => {
    return api.delete(`/admin/menu/${id}`);
  },
};

export default api;
