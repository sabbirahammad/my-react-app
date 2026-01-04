import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../Context/GoogleAuth';
import { useNavigate } from 'react-router-dom';

const ProfileEditForm = ({ profile = {}, setProfile = () => {}, onSave = () => {} }) => {
  const defaultBirthday = ''; // Birthday will be a string (e.g., "2025-07-23")
  const [localProfile, setLocalProfile] = useState({
    ...profile,
    birthday: profile.birthday || defaultBirthday,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const {token} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLocalProfile({
      ...profile,
      birthday: profile.birthday || defaultBirthday,
    });
  }, [profile]);

  const months = useMemo(
    () => [...Array(12)].map((_, i) => new Date(0, i).toLocaleString('default', { month: 'long' })),
    []
  );

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - i);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate('/auth');
      return;
    }

    setLoading(true);

    // Simple validation
    const validationErrors = {};
    if (!localProfile.name) validationErrors.name = 'Full Name is required';
    if (!localProfile.email) validationErrors.email = 'Email is required';
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: localProfile.name,
          email: localProfile.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Profile update failed');
      }

      const data = await response.json();
      console.log('✅ Profile updated successfully:', data);

      setProfile({
        ...localProfile,
        name: data.user.name,
        email: data.user.email,
      });
      setSuccess(true);
      onSave();
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      if (error.message.includes('Not authorized')) {
        navigate('/auth');
      } else {
        alert(`Profile update failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  // Helper function to safely get date components
  const getDateComponent = (component) => {
    if (!localProfile.birthday) return '';

    const date = new Date(localProfile.birthday);
    if (isNaN(date.getTime())) return '';

    switch (component) {
      case 'month':
        return date.toLocaleString('default', { month: 'long' });
      case 'day':
        return date.getDate();
      case 'year':
        return date.getFullYear();
      default:
        return '';
    }
  };

  const handleBirthdayChange = (type, value) => {
    // Create a new date from existing birthday or use current date as fallback
    const currentBirthday = localProfile.birthday ? new Date(localProfile.birthday) : new Date();

    // Validate the current birthday date
    if (isNaN(currentBirthday.getTime())) {
      // If current birthday is invalid, use current date
      currentBirthday.setFullYear(new Date().getFullYear());
      currentBirthday.setMonth(0); // January
      currentBirthday.setDate(1); // 1st
    }

    let newBirthday = new Date(currentBirthday);

    if (type === 'month') newBirthday.setMonth(months.indexOf(value));
    if (type === 'day') newBirthday.setDate(value);
    if (type === 'year') newBirthday.setFullYear(value);

    // Only update if the new date is valid
    if (!isNaN(newBirthday.getTime())) {
      const formattedDate = `${newBirthday.getFullYear()}-${(newBirthday.getMonth() + 1).toString().padStart(2, '0')}-${newBirthday.getDate().toString().padStart(2, '0')}`;
      setLocalProfile({ ...localProfile, birthday: formattedDate });
    }
  };

  return (
    <div className="bg-[#0d0f1c] p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-[14px] sm:text-[16px] font-semibold mb-4 text-white">Edit Profile</h2>

      <form className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label htmlFor="name" className="block mb-1 text-white text-[10px] sm:text-[11px]">Full Name *</label>
          <input
            id="name"
            type="text"
            value={localProfile.name || ''}
            onChange={(e) => setLocalProfile({ ...localProfile, name: e.target.value })}
            className="bg-gray-900 border border-gray-700 text-white px-3 py-2 w-full rounded text-[10px] sm:text-[11px] focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            placeholder="Enter your full name"
          />
          {errors.name && <span className="text-red-500 text-[9px] sm:text-[10px] mt-1 block">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label htmlFor="email" className="block mb-1 text-white text-[10px] sm:text-[11px]">Email Address *</label>
          <input
            id="email"
            type="email"
            value={localProfile.email || ''}
            onChange={(e) => setLocalProfile({ ...localProfile, email: e.target.value })}
            className="bg-gray-900 border border-gray-700 text-white px-3 py-2 w-full rounded text-[10px] sm:text-[11px] focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            placeholder="Enter your email address"
          />
          {errors.email && <span className="text-red-500 text-[9px] sm:text-[10px] mt-1 block">{errors.email}</span>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block mb-1 text-white text-[10px] sm:text-[11px]">Mobile</label>
          <input
            id="phone"
            type="tel"
            value={localProfile.phone || ''}
            onChange={(e) => setLocalProfile({ ...localProfile, phone: e.target.value })}
            className="bg-gray-900 border border-gray-700 text-white px-3 py-2 w-full rounded text-[10px] sm:text-[11px] focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            placeholder="Enter your mobile number"
          />
          {errors.phone && <span className="text-red-500 text-[9px] sm:text-[10px] mt-1 block">{errors.phone}</span>}
        </div>

        {/* Birthday */}
        <div className="sm:col-span-2">
          <label className="block mb-1 text-white text-[10px] sm:text-[11px]">Birthday</label>
          <div className="grid grid-cols-3 gap-2">
            <select
              value={getDateComponent('month')}
              onChange={(e) => handleBirthdayChange('month', e.target.value)}
              className="bg-gray-900 border border-gray-700 text-white px-2 py-2 rounded text-[10px] sm:text-[11px] focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Month</option>
              {months.map((month, i) => <option key={i} value={month}>{month}</option>)}
            </select>
            <select
              value={getDateComponent('day')}
              onChange={(e) => handleBirthdayChange('day', e.target.value)}
              className="bg-gray-900 border border-gray-700 text-white px-2 py-2 rounded text-[10px] sm:text-[11px] focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Day</option>
              {[...Array(31)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
            </select>
            <select
              value={getDateComponent('year')}
              onChange={(e) => handleBirthdayChange('year', e.target.value)}
              className="bg-gray-900 border border-gray-700 text-white px-2 py-2 rounded text-[10px] sm:text-[11px] focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Year</option>
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
          {errors.birthday && <span className="text-red-500 text-[9px] sm:text-[10px] mt-1 block">{errors.birthday}</span>}
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block mb-1 text-white text-[10px] sm:text-[11px]">Gender</label>
          <select
            id="gender"
            value={localProfile.gender || ''}
            onChange={(e) => setLocalProfile({ ...localProfile, gender: e.target.value })}
            className="bg-gray-900 border border-gray-700 text-white px-3 py-2 w-full rounded text-[10px] sm:text-[11px] focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="text-red-500 text-[9px] sm:text-[10px] mt-1 block">{errors.gender}</span>}
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 flex justify-center sm:justify-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto ${loading ? 'bg-gray-500' : 'bg-orange-500 hover:bg-orange-600'} text-white font-semibold px-4 sm:px-6 py-2 rounded text-[10px] sm:text-[11px] transition-colors duration-200 disabled:cursor-not-allowed`}
          >
            {loading ? 'Saving...' : success ? 'Saved!' : 'SAVE CHANGES'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;




