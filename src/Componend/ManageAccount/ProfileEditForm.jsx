import React, { useMemo, useState, useEffect } from 'react';

const ProfileEditForm = ({ profile = {}, setProfile = () => {}, onSave = () => {} }) => {
  const defaultBirthday = { day: '', month: '', year: '' };
  const [localProfile, setLocalProfile] = useState({
    ...profile,
    birthday: profile.birthday || defaultBirthday,
  });

  useEffect(() => {
    setLocalProfile({
      ...profile,
      birthday: profile.birthday || defaultBirthday,
    });
  }, [profile]);

  const months = useMemo(
    () =>
      [...Array(12)].map((_, i) =>
        new Date(0, i).toLocaleString('default', { month: 'long' })
      ),
    []
  );

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - i);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(localProfile);
    onSave();
  };

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#0d0f1c] p-6 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block mb-1 text-white">Full Name</label>
        <input
          id="name"
          type="text"
          value={localProfile.name || ''}
          onChange={(e) =>
            setLocalProfile({ ...localProfile, name: e.target.value })
          }
          className="bg-gray-900 border border-gray-700 text-white px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-1 text-white">Email Address</label>
        <input
          id="email"
          type="email"
          value={localProfile.email || ''}
          onChange={(e) =>
            setLocalProfile({ ...localProfile, email: e.target.value })
          }
          className="bg-gray-900 border border-gray-700 text-white px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block mb-1 text-white">Mobile</label>
        <input
          id="phone"
          type="tel"
          value={localProfile.phone || ''}
          onChange={(e) =>
            setLocalProfile({ ...localProfile, phone: e.target.value })
          }
          className="bg-gray-900 border border-gray-700 text-white px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Birthday */}
      <div className="sm:col-span-2 lg:col-span-1">
        <label className="block mb-1 text-white">Birthday</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={localProfile.birthday.month}
            onChange={(e) =>
              setLocalProfile({
                ...localProfile,
                birthday: { ...localProfile.birthday, month: e.target.value },
              })
            }
            className="bg-gray-900 border border-gray-700 text-white px-2 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Month</option>
            {months.map((month, i) => (
              <option key={i} value={month}>{month}</option>
            ))}
          </select>
          <select
            value={localProfile.birthday.day}
            onChange={(e) =>
              setLocalProfile({
                ...localProfile,
                birthday: { ...localProfile.birthday, day: e.target.value },
              })
            }
            className="bg-gray-900 border border-gray-700 text-white px-2 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Day</option>
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select
            value={localProfile.birthday.year}
            onChange={(e) =>
              setLocalProfile({
                ...localProfile,
                birthday: { ...localProfile.birthday, year: e.target.value },
              })
            }
            className="bg-gray-900 border border-gray-700 text-white px-2 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Gender */}
      <div>
        <label htmlFor="gender" className="block mb-1 text-white">Gender</label>
        <select
          id="gender"
          value={localProfile.gender || ''}
          onChange={(e) =>
            setLocalProfile({ ...localProfile, gender: e.target.value })
          }
          className="bg-gray-900 border border-gray-700 text-white px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="sm:col-span-2 lg:col-span-3 flex justify-center md:justify-end">
        <button
          type="submit"
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded transition-colors duration-200"
        >
          SAVE CHANGES
        </button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
