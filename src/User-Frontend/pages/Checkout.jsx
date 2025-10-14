import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaTruck, FaShoppingBag, FaArrowLeft, FaCreditCard } from "react-icons/fa";
import { useCart } from '../context.cart.jsx';

const DarkCard = ({ children, className = "" }) => (
  <div
    className={`bg-[#3a2618] text-white rounded-lg p-6 shadow-md ${className}`}
  >
    {children}
  </div>
);

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // Dummy user data (in real app, fetch from context or localStorage)
  const [userInfo, setUserInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567"
  });

  // Delivery method state
  const [deliveryMethod, setDeliveryMethod] = useState("home");

  // Address state
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", address: "123 Main Street, Toronto, M5V 3A8", isDefault: true },
    { id: 2, label: "Work", address: "456 Business Ave, Toronto, M4W 1A1", isDefault: false }
  ]);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    instructions: ""
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
    const savedAddresses = localStorage.getItem('addresses');
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  // Save user info to localStorage
  const saveUserInfo = () => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };

  // Save addresses to localStorage
  const saveAddresses = () => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  };

  // Handle user info change
  const handleUserInfoChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  // Handle add new address
  const handleAddAddress = () => {
    if (newAddress.label && newAddress.addressLine1 && newAddress.city && newAddress.postalCode) {
      const fullAddress = `${newAddress.addressLine1}${newAddress.addressLine2 ? ', ' + newAddress.addressLine2 : ''}, ${newAddress.city}, ${newAddress.postalCode}`;
      const newAddr = {
        id: addresses.length + 1,
        label: newAddress.label,
        address: fullAddress,
        isDefault: false
      };
      setAddresses(prev => [...prev, newAddr]);
      setNewAddress({ label: "", addressLine1: "", addressLine2: "", city: "", postalCode: "", instructions: "" });
      setShowAddAddress(false);
      saveAddresses();
    }
  };

  // Calculate order totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const deliveryFee = deliveryMethod === "home" ? 5.99 : 0;
  const total = subtotal + tax + deliveryFee;

  // Handle proceed to billing
  const handleProceedToBilling = () => {
    // Basic validation
    if (!userInfo.fullName || !userInfo.email || !userInfo.phone) {
      alert("Please fill in all user information fields.");
      return;
    }
    if (deliveryMethod === "home" && !selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }
    saveUserInfo();
    navigate('/user/billing'); // Assuming billing page exists
  };

  return (
    <div className="min-h-screen bg-[#FF6A00] flex flex-col">
      <main className="flex-1 px-8 py-12 text-white">
        <h1 className="text-3xl font-bold mb-1">Checkout</h1>
        <p className="text-sm mb-8">Complete your order details</p>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: User Info, Address, Delivery Method */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Information */}
            <DarkCard>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FaUser /> User Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">Full Name</label>
                  <input
                    type="text"
                    value={userInfo.fullName}
                    onChange={(e) => handleUserInfoChange('fullName', e.target.value)}
                    className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => handleUserInfoChange('email', e.target.value)}
                    className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => handleUserInfoChange('phone', e.target.value)}
                    className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                  />
                </div>
              </div>
            </DarkCard>

            {/* Delivery Method */}
            <DarkCard>
              <h3 className="font-semibold mb-4">Delivery Method</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="home"
                    checked={deliveryMethod === "home"}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="text-orange-600"
                  />
                  <FaTruck className="text-orange-600" />
                  <span>Home Delivery</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryMethod === "pickup"}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="text-orange-600"
                  />
                  <FaShoppingBag className="text-orange-600" />
                  <span>Pickup from Restaurant</span>
                </label>
              </div>
            </DarkCard>

            {/* Delivery Address - Only show if home delivery */}
            {deliveryMethod === "home" && (
              <DarkCard>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt /> Delivery Address
                </h3>
                <div className="space-y-3">
                  <h4 className="font-semibold">Saved Addresses</h4>
                  {addresses.map((addr) => (
                    <label key={addr.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="address"
                        value={addr.id}
                        checked={selectedAddress === addr.id}
                        onChange={(e) => setSelectedAddress(parseInt(e.target.value))}
                        className="text-orange-600"
                      />
                      <div>
                        <span className="font-semibold">{addr.label}</span>
                        {addr.isDefault && <span className="text-orange-600 text-sm ml-2">(Default)</span>}
                        <p className="text-sm text-gray-300">{addr.address}</p>
                      </div>
                    </label>
                  ))}
                  <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="text-orange-600 hover:text-orange-700 text-sm"
                  >
                    + Add New Address
                  </button>
                  {showAddAddress && (
                    <div className="bg-[#2a1f0f] p-4 rounded mt-4 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Label (e.g., Home, Work)"
                          value={newAddress.label}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, label: e.target.value }))}
                          className="bg-[#1a1209] rounded px-3 py-2 text-white"
                        />
                        <input
                          type="text"
                          placeholder="Address Line 1"
                          value={newAddress.addressLine1}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, addressLine1: e.target.value }))}
                          className="bg-[#1a1209] rounded px-3 py-2 text-white"
                        />
                        <input
                          type="text"
                          placeholder="Address Line 2 (optional)"
                          value={newAddress.addressLine2}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, addressLine2: e.target.value }))}
                          className="bg-[#1a1209] rounded px-3 py-2 text-white"
                        />
                        <input
                          type="text"
                          placeholder="City"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                          className="bg-[#1a1209] rounded px-3 py-2 text-white"
                        />
                        <input
                          type="text"
                          placeholder="Postal Code"
                          value={newAddress.postalCode}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                          className="bg-[#1a1209] rounded px-3 py-2 text-white"
                        />
                        <textarea
                          placeholder="Delivery Instructions (optional)"
                          value={newAddress.instructions}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, instructions: e.target.value }))}
                          className="bg-[#1a1209] rounded px-3 py-2 text-white md:col-span-2"
                          rows="2"
                        />
                      </div>
                      <button
                        onClick={handleAddAddress}
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                      >
                        Add Address
                      </button>
                    </div>
                  )}
                </div>
              </DarkCard>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            <DarkCard>
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#5a3f1a] pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {deliveryMethod === "home" && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t border-[#5a3f1a] pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </DarkCard>

            {/* Navigation Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => navigate(-1)}
                className="w-full bg-transparent border border-white text-white px-4 py-3 rounded hover:bg-white hover:text-[#FF6A00] flex items-center justify-center gap-2"
              >
                <FaArrowLeft /> Back to Cart
              </button>
              <button
                onClick={handleProceedToBilling}
                className="w-full bg-orange-600 text-white px-4 py-3 rounded hover:bg-orange-700 flex items-center justify-center gap-2"
              >
                <FaCreditCard /> Proceed to Billing
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
