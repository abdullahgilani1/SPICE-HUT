import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheck, FaShoppingCart, FaHistory, FaStar, FaDownload, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useCart } from '../context.cart.jsx';

const DarkCard = ({ children, className = "" }) => (
  <div
    className={`bg-[#3a2618] text-white rounded-lg p-6 shadow-md ${className}`}
  >
    {children}
  </div>
);

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, emptyCart, addLoyaltyPoints, instantApplied } = useCart();

  // Order data state
  const [orderData, setOrderData] = useState({
    orderId: '',
    orderDate: '',
    orderTime: '',
    userName: '',
    paymentMethod: '',
    deliveryAddress: '',
    deliveryMethod: '',
    estimatedTime: '',
    items: [],
    subtotal: 0,
    tax: 0,
    deliveryFee: 0,
    total: 0
  });

  // Optional UX state
  const [rating, setRating] = useState(0);
  const [saveAddress, setSaveAddress] = useState(false);

  // Load order data on mount
  useEffect(() => {
    const loadOrderData = () => {
      // Use passed order ID or generate new one
      const passedOrderId = location.state?.orderId;
      const orderId = passedOrderId || `SPH${Math.floor(Math.random() * 100000)}`;

      // Get current date and time
      const now = new Date();
      const orderDate = now.toLocaleDateString();
      const orderTime = now.toLocaleTimeString();

      // Load user info
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

      // Load billing info
      const billingInfo = JSON.parse(localStorage.getItem('billingInfo') || '{}');

      // Load payment details
      const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');

      // Load delivery method
      const deliveryMethod = localStorage.getItem('deliveryMethod') || 'home';

      // Load selected address if home delivery
      let deliveryAddress = '';
      if (deliveryMethod === 'home') {
        const addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
        const selectedAddressId = localStorage.getItem('selectedAddress');
        const selectedAddress = addresses.find(addr => addr.id === parseInt(selectedAddressId));
        deliveryAddress = selectedAddress ? selectedAddress.address : billingInfo.address || '';
      }

      // Determine payment method display
      let paymentMethod = 'Cash on Delivery';
      if (paymentDetails.cardNumber) {
        paymentMethod = 'Card Payment';
      } else if (paymentDetails.paypalEmail) {
        paymentMethod = 'PayPal';
      } else if (paymentDetails.bankAccount) {
        paymentMethod = 'Bank Transfer';
      }

      // Calculate totals
      const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const tax = subtotal * 0.1;
      const deliveryFee = deliveryMethod === "home" ? 5.99 : 0;
      const total = subtotal + tax + deliveryFee;

      // Estimated delivery time
      const estimatedTime = deliveryMethod === 'home' ? '30–45 minutes' : 'Ready for pickup in 15 minutes';

      setOrderData({
        orderId,
        orderDate,
        orderTime,
        userName: userInfo.fullName || billingInfo.fullName || 'Valued Customer',
        paymentMethod,
        deliveryAddress,
        deliveryMethod: deliveryMethod === 'home' ? 'Home Delivery' : 'Pickup from Restaurant',
        estimatedTime,
        items: cartItems,
        subtotal,
        tax,
        deliveryFee,
        total
      });

      // Reset cart after loading data
      emptyCart();

      // Add loyalty points based on subtotal, but skip if instant redemption was applied
      if (!instantApplied) {
        addLoyaltyPoints(Math.floor(subtotal));
      }

      // Save order to localStorage for order history
      if (userInfo.email) {
        const existingOrders = JSON.parse(localStorage.getItem(`orders_${userInfo.email}`) || '[]');
        // Check if orderId already exists to prevent duplicates
        const orderExists = existingOrders.some(order => order.orderId === orderData.orderId);
        if (!orderExists) {
          existingOrders.push(orderData);
          localStorage.setItem(`orders_${userInfo.email}`, JSON.stringify(existingOrders));
        }
      }
    };

    loadOrderData();
  }, [cartItems, emptyCart, addLoyaltyPoints]);

  // Handle rating
  const handleRating = (value) => {
    setRating(value);
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    navigate('/user/menu');
  };

  // Handle view order history (placeholder)
  const handleViewOrderHistory = () => {
    // For now, just navigate to profile or show alert
    alert('Order history feature coming soon!');
    navigate('/user/profile');
  };

  // Handle download invoice (placeholder)
  const handleDownloadInvoice = () => {
    alert('Invoice download feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-[#FF6A00] flex flex-col">
      <main className="flex-1 px-8 py-12 text-white">
        {/* Success Message */}
        <div className="max-w-4xl mx-auto text-center mb-8 animate-fade-in">
          <div className="bg-green-600 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <FaCheck className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold mb-2">🎉 Thank You, {orderData.userName}!</h1>
          <p className="text-lg mb-4">Your order has been successfully placed.</p>
          <p className="text-sm text-gray-200">
            Your delicious food is being prepared. You will receive an update once it's out for delivery.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary Card */}
            <DarkCard className="animate-fade-in-delay">
              <h3 className="font-semibold mb-4 text-xl">Order Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-300">Order ID</p>
                  <p className="font-semibold">{orderData.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Order Date & Time</p>
                  <p className="font-semibold">{orderData.orderDate} at {orderData.orderTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Payment Method</p>
                  <p className="font-semibold">{orderData.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Delivery Method</p>
                  <p className="font-semibold">{orderData.deliveryMethod}</p>
                </div>
                {orderData.deliveryAddress && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-300">Delivery Address</p>
                    <p className="font-semibold">{orderData.deliveryAddress}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-300">Estimated Delivery Time</p>
                  <p className="font-semibold text-orange-400">{orderData.estimatedTime}</p>
                </div>
              </div>
            </DarkCard>

            {/* Ordered Items */}
            <DarkCard className="animate-fade-in-delay">
              <h3 className="font-semibold mb-4">Ordered Items</h3>
              <div className="space-y-4">
                {orderData.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-[#5a3f1a] pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image || '/placeholder-food.jpg'}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-300">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-300">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t border-[#5a3f1a] pt-4 mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${orderData.tax.toFixed(2)}</span>
                </div>
                {orderData.deliveryFee > 0 && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${orderData.deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t border-[#5a3f1a] pt-2">
                  <span>Total Amount Paid</span>
                  <span>${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </DarkCard>
          </div>

          {/* Right Column: Actions and Optional Features */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <DarkCard className="animate-fade-in-delay">
              <h3 className="font-semibold mb-4">What's Next?</h3>
              <div className="space-y-3">
                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-orange-600 text-white px-4 py-3 rounded hover:bg-orange-700 flex items-center justify-center gap-2"
                >
                  <FaShoppingCart /> Continue Shopping
                </button>
                <button
                  onClick={handleViewOrderHistory}
                  className="w-full bg-transparent border border-white text-white px-4 py-3 rounded hover:bg-white hover:text-[#FF6A00] flex items-center justify-center gap-2"
                >
                  <FaHistory /> View Order History
                </button>
              </div>
            </DarkCard>

            {/* Optional UX Elements */}
            <DarkCard className="animate-fade-in-delay">
              <h3 className="font-semibold mb-4">Rate Your Experience</h3>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer text-xl ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                    onClick={() => handleRating(star)}
                  />
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-300">Thank you for your {rating} star rating!</p>
              )}
            </DarkCard>

            <DarkCard className="animate-fade-in-delay">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold">Save this address for next order</span>
                <button
                  onClick={() => setSaveAddress(!saveAddress)}
                  className="text-orange-400"
                >
                  {saveAddress ? <FaToggleOn className="text-2xl" /> : <FaToggleOff className="text-2xl text-gray-400" />}
                </button>
              </div>
              <button
                onClick={handleDownloadInvoice}
                className="w-full bg-transparent border border-orange-400 text-orange-400 px-4 py-2 rounded hover:bg-orange-400 hover:text-white flex items-center justify-center gap-2"
              >
                <FaDownload /> Download Invoice (PDF)
              </button>
            </DarkCard>
          </div>
        </div>
      </main>
    </div>
  );
}
