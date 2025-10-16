import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCreditCard, FaArrowLeft, FaCheck } from "react-icons/fa";
import { useCart } from '../context.cart.jsx';

const DarkCard = ({ children, className = "" }) => (
  <div
    className={`bg-[#3a2618] text-white rounded-lg p-6 shadow-md ${className}`}
  >
    {children}
  </div>
);

export default function Billing() {
  const navigate = useNavigate();
  const { cartItems, loyaltyPoints, useLoyaltyDiscount, instantApplied, applyInstantRedemption } = useCart();

  // Billing information state
  const [billingInfo, setBillingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: ""
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    paypalEmail: "",
    bankAccount: "",
    routingNumber: ""
  });

  // Loyalty discount state
  const [applyLoyaltyDiscount, setApplyLoyaltyDiscount] = useState(false);
  const [instantDiscount, setInstantDiscount] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      const userInfo = JSON.parse(savedUser);
      setBillingInfo(prev => ({
        ...prev,
        fullName: userInfo.fullName,
        email: userInfo.email,
        phone: userInfo.phone
      }));
    }

    const savedAddresses = localStorage.getItem('addresses');
    const deliveryMethod = localStorage.getItem('deliveryMethod') || 'home';
    if (savedAddresses && deliveryMethod === 'home') {
      const addresses = JSON.parse(savedAddresses);
      const selectedAddressId = localStorage.getItem('selectedAddress');
      const selectedAddress = addresses.find(addr => addr.id === parseInt(selectedAddressId));
      if (selectedAddress) {
        setBillingInfo(prev => ({
          ...prev,
          address: selectedAddress.address
        }));
      }
    }

    // Load saved billing info if exists
    const savedBilling = localStorage.getItem('billingInfo');
    if (savedBilling) {
      setBillingInfo(JSON.parse(savedBilling));
    }

    const savedPayment = localStorage.getItem('paymentDetails');
    if (savedPayment) {
      setPaymentDetails(JSON.parse(savedPayment));
    }
  }, []);

  // Save billing info to localStorage
  const saveBillingInfo = () => {
    localStorage.setItem('billingInfo', JSON.stringify(billingInfo));
  };

  // Save payment details to localStorage
  const savePaymentDetails = () => {
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
  };

  // Handle billing info change
  const handleBillingInfoChange = (field, value) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }));
  };

  // Handle payment details change
  const handlePaymentChange = (field, value) => {
    setPaymentDetails(prev => ({ ...prev, [field]: value }));
  };

  // Calculate order totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const deliveryMethod = localStorage.getItem('deliveryMethod') || 'home';
  const deliveryFee = deliveryMethod === "home" ? 5.99 : 0;
  const loyaltyDiscount = applyLoyaltyDiscount && loyaltyPoints >= 100 ? 1 : 0;
  const instantEligible = loyaltyPoints < 100 && subtotal >= 100 && (loyaltyPoints + Math.floor(subtotal)) >= 100;
  const total = subtotal + tax + deliveryFee - loyaltyDiscount - instantDiscount;

  // Handle apply loyalty discount
  const handleApplyLoyaltyDiscount = () => {
    if (loyaltyPoints >= 100) {
      setApplyLoyaltyDiscount(!applyLoyaltyDiscount);
    }
  };

  // Validate form
  const validateForm = () => {
    if (!billingInfo.fullName || !billingInfo.email || !billingInfo.phone || !billingInfo.address || !billingInfo.city || !billingInfo.postalCode) {
      alert("Please fill in all billing information fields.");
      return false;
    }

    if (paymentMethod === "credit" || paymentMethod === "debit") {
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv || !paymentDetails.cardholderName) {
        alert("Please fill in all card details.");
        return false;
      }
    } else if (paymentMethod === "paypal") {
      if (!paymentDetails.paypalEmail) {
        alert("Please enter your PayPal email.");
        return false;
      }
    } else if (paymentMethod === "bank") {
      if (!paymentDetails.bankAccount || !paymentDetails.routingNumber) {
        alert("Please fill in all bank transfer details.");
        return false;
      }
    }

    return true;
  };

  // Handle apply instant redemption
  const handleApplyInstantRedemption = () => {
    if (instantEligible && instantDiscount === 0) {
      const discount = applyInstantRedemption(subtotal);
      setInstantDiscount(discount);
    } else if (instantDiscount > 0) {
      setInstantDiscount(0);
    }
  };

  // Handle confirm order
  const handleConfirmOrder = () => {
    if (!validateForm()) return;

    // Apply loyalty discount if selected
    if (applyLoyaltyDiscount) {
      useLoyaltyDiscount();
    }

    saveBillingInfo();
    savePaymentDetails();

    // Generate unique order ID
    const orderId = `SPH${Date.now()}`;

    // Navigate to order confirmation with order ID
    navigate('/user/order-confirmation', { state: { orderId } });
  };

  return (
    <div className="min-h-screen bg-[#FF6A00] flex flex-col">
      <main className="flex-1 px-8 py-12 text-white">
        <h1 className="text-3xl font-bold mb-1">Billing</h1>
        <p className="text-sm mb-8">Complete your payment information</p>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Billing Info and Payment Method */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Information */}
            <DarkCard>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FaUser /> Billing Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">Full Name</label>
                  <input
                    type="text"
                    value={billingInfo.fullName}
                    onChange={(e) => handleBillingInfoChange('fullName', e.target.value)}
                    className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={billingInfo.email}
                    onChange={(e) => handleBillingInfoChange('email', e.target.value)}
                    className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    value={billingInfo.phone}
                    onChange={(e) => handleBillingInfoChange('phone', e.target.value)}
                    className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold">Billing Address</label>
                  <input
                    type="text"
                    value={billingInfo.address}
                    onChange={(e) => handleBillingInfoChange('address', e.target.value)}
                    className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">City</label>
                  <input
                    type="text"
                    value={billingInfo.city}
                    onChange={(e) => handleBillingInfoChange('city', e.target.value)}
                    className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Postal Code</label>
                  <input
                    type="text"
                    value={billingInfo.postalCode}
                    onChange={(e) => handleBillingInfoChange('postalCode', e.target.value)}
                    className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                  />
                </div>
              </div>
            </DarkCard>

            {/* Payment Method */}
            <DarkCard>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FaCreditCard /> Payment Method
              </h3>
              <div className="space-y-3 mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={paymentMethod === "credit"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-orange-600"
                  />
                  <span>Credit Card</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="debit"
                    checked={paymentMethod === "debit"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-orange-600"
                  />
                  <span>Debit Card</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-orange-600"
                  />
                  <span>PayPal</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-orange-600"
                  />
                  <span>Bank Transfer</span>
                </label>
              </div>

              {/* Payment Details */}
              {(paymentMethod === "credit" || paymentMethod === "debit") && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                        className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={paymentDetails.expiryDate}
                        onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                        className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={paymentDetails.cvv}
                        onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                        className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold">Cardholder Name</label>
                      <input
                        type="text"
                        value={paymentDetails.cardholderName}
                        onChange={(e) => handlePaymentChange('cardholderName', e.target.value)}
                        className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div>
                  <label className="text-sm font-semibold">PayPal Email</label>
                  <input
                    type="email"
                    value={paymentDetails.paypalEmail}
                    onChange={(e) => handlePaymentChange('paypalEmail', e.target.value)}
                    className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                  />
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold">Bank Account Number</label>
                    <input
                      type="text"
                      value={paymentDetails.bankAccount}
                      onChange={(e) => handlePaymentChange('bankAccount', e.target.value)}
                      className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Routing Number</label>
                    <input
                      type="text"
                      value={paymentDetails.routingNumber}
                      onChange={(e) => handlePaymentChange('routingNumber', e.target.value)}
                      className="w-full bg-[#2a1f0f] rounded px-3 py-2 text-white"
                    />
                  </div>
                </div>
              )}
            </DarkCard>
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
                {applyLoyaltyDiscount && (
                  <div className="flex justify-between text-green-400">
                    <span>Loyalty Discount</span>
                    <span>-${loyaltyDiscount.toFixed(2)}</span>
                  </div>
                )}
                {instantDiscount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Instant Redemption</span>
                    <span>-${instantDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t border-[#5a3f1a] pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Loyalty Points */}
              <div className="mt-4">
                {loyaltyPoints < 100 ? (
                  instantEligible ? (
                    <div>
                      <p className="text-sm mb-2">You have {loyaltyPoints} loyalty points. With this order, you can instantly redeem for a discount!</p>
                      <button
                        onClick={handleApplyInstantRedemption}
                        className={`w-full text-xs px-2 py-1 rounded ${instantDiscount > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}`}
                      >
                        {instantDiscount > 0 ? 'Remove Instant Discount' : 'Apply Instant Discount'}
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">You have {loyaltyPoints} loyalty points. Earn {100 - loyaltyPoints} more to unlock a $1 discount.</p>
                  )
                ) : (
                  <div>
                    <p className="text-sm mb-2">You have {loyaltyPoints} loyalty points! Apply $1 discount now?</p>
                    <button
                      onClick={handleApplyLoyaltyDiscount}
                      className={`w-full text-xs px-2 py-1 rounded ${applyLoyaltyDiscount ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}`}
                    >
                      {applyLoyaltyDiscount ? 'Remove $1 Discount' : 'Apply $1 Discount'}
                    </button>
                  </div>
                )}
              </div>
            </DarkCard>

            {/* Navigation Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => navigate('/user/checkout')}
                className="w-full bg-transparent border border-white text-white px-4 py-3 rounded hover:bg-white hover:text-[#FF6A00] flex items-center justify-center gap-2"
              >
                <FaArrowLeft /> Back to Checkout
              </button>
              <button
                onClick={handleConfirmOrder}
                className="w-full bg-orange-600 text-white px-4 py-3 rounded hover:bg-orange-700 flex items-center justify-center gap-2"
              >
                <FaCheck /> Confirm Order
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
