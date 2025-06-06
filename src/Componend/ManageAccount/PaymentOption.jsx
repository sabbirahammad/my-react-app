import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaMoneyBillWave, FaMobileAlt } from 'react-icons/fa';
// import { useAuth } from '../context/AuthContext'; // কনটেক্সট থেকে ইউজার আনো

const paymentMethods = [
  {
    id: 'cod',
    name: 'Cash on Delivery',
    icon: <FaMoneyBillWave />,
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <FaCreditCard />,
  },
  {
    id: 'bkash',
    name: 'bKash',
    icon: <FaMobileAlt />,
  },
  {
    id: 'nagad',
    name: 'Nagad',
    icon: <FaMobileAlt />,
  },
];

const PaymentOption = ({ selectedMethod, onSelect }) => {
  const { user } = useAuth(); // ইউজার স্টেট
  const navigate = useNavigate();
  const [active, setActive] = useState(selectedMethod || 'cod');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSelect = (methodId) => {
    setActive(methodId);
    if (onSelect) onSelect(methodId);
  };

  if (!user) return null; // রেন্ডার না করো যদি ইউজার না থাকে

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Payment Method</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => handleSelect(method.id)}
            className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
              active === method.id
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl">{method.icon}</div>
            <div className="font-medium">{method.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentOption;

