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
    return api.post('/auth/register', userData);
  },

  // Admin signup
  adminSignup: async (adminData) => {
    return api.post('/auth/register', adminData);
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

  // Verify user for password reset
  verifyUser: async (verificationData) => {
    return api.post('/auth/verify-user', verificationData);
  },

  // Reset password
  resetPassword: async (resetData) => {
    return api.post('/auth/reset-password', resetData);
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


// Customer API (backend integration)
export const customerAPI = {
  // Get all customers
  getCustomers: async () => {
    return api.get('/customers');
  },

  // Delete a customer
  deleteCustomer: async (id) => {
    return api.delete(`/customers/${id}`);
  },
};


// Admin API (backend integration)
export const adminAPI = {
  // Get all admins
  getAdmins: async () => {
    return api.get('/admins');
  },

  // Add a new admin
  addAdmin: async (adminData) => {
    return api.post('/admins', adminData);
  },

  // Update an admin
  updateAdmin: async (id, adminData) => {
    return api.put(`/admins/${id}`, adminData);
  },

  // Delete an admin
  deleteAdmin: async (id) => {
    return api.delete(`/admins/${id}`);
  },
};

export default api;
