import React from "react";
import { useNavigate } from "react-router-dom";
import StatsCard from "../Components/statscard";
import { FiShoppingCart, FiDollarSign, FiUsers, FiTrendingUp, FiPackage } from "react-icons/fi";

export default function Dashboard() {
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from an API
  const stats = [
    {
      title: "Total Orders",
      value: "1,247",
      icon: <FiShoppingCart />,
      color: "blue"
    },
    {
      title: "Total Revenue",
      value: "$45,678",
      icon: <FiDollarSign />,
      color: "green"
    },
    {
      title: "Total Customers",
      value: "892",
      icon: <FiUsers />,
      color: "purple"
    },
    {
      title: "Menu Items",
      value: "156",
      icon: <FiPackage />,
      color: "orange"
    },
    {
      title: "Growth Rate",
      value: "+12.5%",
      icon: <FiTrendingUp />,
      color: "green"
    }
  ];

  return (
    <main className="p-4 md:p-8 lg:p-12 font-sans min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-lg">Welcome back! Here's an overview of your restaurant's performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((order) => (
              <div key={order} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-900">Order #{1000 + order}</p>
                  <p className="text-sm text-gray-600">2 items • $24.50</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">2 min ago</p>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => navigate('/admin/menumanagement')} className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 flex flex-col items-center">
              <FiPackage className="text-2xl mb-2" />
              <span className="font-semibold">Add Menu Item</span>
            </button>
            <button onClick={() => navigate('/admin/customers')} className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 flex flex-col items-center">
              <FiUsers className="text-2xl mb-2" />
              <span className="font-semibold">View Customers</span>
            </button>
            <button onClick={() => navigate('/admin/orders')} className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex flex-col items-center">
              <FiShoppingCart className="text-2xl mb-2" />
              <span className="font-semibold">Manage Orders</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
