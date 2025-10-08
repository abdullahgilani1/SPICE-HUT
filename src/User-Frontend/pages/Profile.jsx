import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaClock, FaGift, FaHome, FaBriefcase, FaTrash, FaStar, FaMapMarkerAlt } from "react-icons/fa";

const initialProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  memberSince: "January 2024",
};

const initialAddresses = [
  { id: 1, label: "Home", address: "123 Main Street, Toronto, M5V 3A8", isDefault: true },
  { id: 2, label: "Work", address: "456 Business Ave, Toronto, M4W 1A1", isDefault: false },
];

const initialOrderHistory = [
  { id: 1, date: "2024-04-01", items: ["Butter Chicken", "Naan"], total: 32.45 },
  { id: 2, date: "2024-03-15", items: ["Paneer Tikka", "Rice"], total: 25.00 },
  { id: 3, date: "2024-02-28", items: ["Chicken Biryani"], total: 39.79 },
];

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showAddresses, setShowAddresses] = useState(true);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [orderHistory] = useState(initialOrderHistory);

  const loyaltyPoints = 150;
  const nextRewardPoints = 100;
  const totalOrders = orderHistory.length;
  const totalSpent = orderHistory.reduce((acc, order) => acc + order.total, 0).toFixed(2);
  const favoriteItem = "Butter Chicken";

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({ ...addr, isDefault: addr.id === id }))
    );
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleAddAddress = () => {
    const newId = addresses.length ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
    const newAddress = { id: newId, label: "New Address", address: "", isDefault: false };
    setAddresses((prev) => [...prev, newAddress]);
  };

  const handleAddressChange = (id, field, value) => {
    setAddresses((prev) =>
      prev.map((addr) =>
        addr.id === id ? { ...addr, [field]: value } : addr
      )
    );
  };

  return (
    <div className="min-h-screen bg-orange-500 flex flex-col">
      <main className="flex-1 p-8 text-white font-sans">
        <h1 className="text-3xl font-bold mb-1">My Profile</h1>
        <p className="mb-6 text-sm">Manage your account settings and preferences</p>

        {/* Personal Information */}
        <div className="bg-[#3c2a1a] rounded-lg p-6 mb-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <FaUser /> Personal Information
            </h2>
            <button
              onClick={handleEditToggle}
              className="bg-orange-600 px-3 py-1 rounded text-sm hover:bg-orange-700"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleProfileChange}
                  className="w-full bg-[#4a3a2a] rounded px-2 py-1 text-white text-sm"
                />
              ) : (
                <p className="bg-[#4a3a2a] rounded px-2 py-1 text-sm">{profile.firstName}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold">Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleProfileChange}
                  className="w-full bg-[#4a3a2a] rounded px-2 py-1 text-white text-sm"
                />
              ) : (
                <p className="bg-[#4a3a2a] rounded px-2 py-1 text-sm">{profile.lastName}</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold flex items-center gap-1">
                <FaEnvelope /> Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full bg-[#4a3a2a] rounded px-2 py-1 text-white text-sm"
                />
              ) : (
                <p className="bg-[#4a3a2a] rounded px-2 py-1 text-sm">{profile.email}</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold flex items-center gap-1">
                <FaPhone /> Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className="w-full bg-[#4a3a2a] rounded px-2 py-1 text-white text-sm"
                />
              ) : (
                <p className="bg-[#4a3a2a] rounded px-2 py-1 text-sm">{profile.phone}</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold flex items-center gap-1">
                <FaClock /> Member Since
              </label>
              <p className="bg-[#4a3a2a] rounded px-2 py-1 text-sm">{profile.memberSince}</p>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left column */}
          <div className="col-span-2 space-y-6">
            {/* Delivery Addresses */}
            <div className="bg-[#3c2a1a] rounded-lg p-4 shadow-md">
              <div
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => setShowAddresses(!showAddresses)}
              >
                <h3 className="font-semibold flex items-center gap-2">
                  <FaEnvelope /> Delivery Addresses ({addresses.length})
                </h3>
                <span>{showAddresses ? "▲" : "▼"}</span>
              </div>
              {showAddresses && (
                <div>
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="border border-[#5a3f1a] rounded p-3 mb-3 flex justify-between items-center"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="bg-red-700 text-xs px-2 py-0.5 rounded ml-2">Default</span>
                          )}
                        </div>
                        <p className="text-sm">{addr.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!addr.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(addr.id)}
                            className="bg-orange-600 text-xs px-2 py-1 rounded hover:bg-orange-700"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete Address"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleAddAddress}
                    className="w-full bg-orange-600 text-sm py-2 rounded hover:bg-orange-700"
                  >
                    + Add New Address
                  </button>
                </div>
              )}
            </div>

            {/* Order History */}
            <div className="bg-[#3c2a1a] rounded-lg p-4 shadow-md">
              <div
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => setShowOrderHistory(!showOrderHistory)}
              >
                <h3 className="font-semibold flex items-center gap-2">
                  <FaEnvelope /> Order History ({orderHistory.length})
                </h3>
                <span>{showOrderHistory ? "▲" : "▼"}</span>
              </div>
              {showOrderHistory && (
                <div>
                  {orderHistory.map((order) => (
                    <div key={order.id} className="border border-[#5a3f1a] rounded p-3 mb-3">
                      <p className="text-sm font-semibold">Order Date: {order.date}</p>
                      <p className="text-sm">Items: {order.items.join(", ")}</p>
                      <p className="text-sm font-semibold">Total: ${order.total.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Loyalty Points */}
            <div className="bg-[#3c2a1a] rounded-lg p-4 shadow-md text-center">
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <FaGift /> Loyalty Points
              </h3>
              <div className="bg-red-900 rounded-full w-20 h-20 flex flex-col justify-center items-center mx-auto mb-4">
                <FaStar className="text-yellow-400 text-xl" />
                <span className="text-white font-bold text-lg">{loyaltyPoints}</span>
                <span className="text-xs">Points</span>
              </div>
              <div className="bg-[#4a3a2a] rounded p-2 mb-2 text-xs">
                <p className="font-semibold">Next Reward</p>
                <p>100 points until $5 off your next order</p>
                <div className="bg-gray-600 rounded h-2 mt-1">
                  <div
                    className="bg-red-900 h-2 rounded"
                    style={{ width: `${(loyaltyPoints / (loyaltyPoints + nextRewardPoints)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <ul className="text-xs text-left mb-2">
                <li>• Earn 1 point per $1 spent</li>
                <li>• 100 points = $1 discount</li>
                <li>• Points never expire</li>
              </ul>
              <button className="bg-red-900 w-full py-1 rounded text-sm hover:bg-red-800">
                View Rewards
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
