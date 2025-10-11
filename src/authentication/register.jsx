import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: 'user', // Hardcode role for user registration
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }

      console.log('User registration successful:', data);
      navigate('/login'); // Redirect to login page after successful registration

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FF6A00] flex items-center justify-center">
      <div className="bg-black bg-opacity-70 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Create User Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#B35B00]" />
          <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#B35B00]" />
          <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#B35B00]" />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#B35B00]" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#B35B00]" />
          <button type="submit" disabled={loading} className="w-full bg-[#4B0B0B] text-white py-3 rounded hover:bg-[#FFB366] hover:text-black transition-all disabled:bg-gray-500">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center text-white mt-4">Already have an account? <Link to="/login" className="text-[#FFB366] hover:underline">Login</Link></p>
      </div>
    </div>
  );
}