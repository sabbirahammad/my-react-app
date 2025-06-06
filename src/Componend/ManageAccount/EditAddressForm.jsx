// File: EditAddressForm.jsx
import React, { useState, useEffect } from 'react';

const EditAddressForm = ({ onBack, onSave, initialData }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    province: '',
    city: '',
    zone: '',
    address: '',
    landmark: '',
    label: 'HOME',
  });

  useEffect(() => {
    if (initialData) {
      setForm({ ...form, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...form,
        postcode: `${form.province} - ${form.city} - ${form.zone}`,
      });
    }
  };

  return (
    <div className="text-white text-[11px] p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Edit My Address</h2>
        <button className="text-blue-400 text-xs" onClick={onBack}>
          Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#0d0f1c] p-6 rounded grid md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="bg-black border border-gray-600 w-full px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Province / Region</label>
          <select
            name="province"
            value={form.province}
            onChange={handleChange}
            className="bg-black border border-gray-600 w-full px-2 py-1 rounded"
          >
            <option value="">Select</option>
            <option>Chattogram</option>
            <option>Dhaka</option>
            <option>Rajshahi</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="bg-black border border-gray-600 w-full px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">City</label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="bg-black border border-gray-600 w-full px-2 py-1 rounded"
          >
            <option value="">Select</option>
            <option>Comilla - Daudkandi</option>
            <option>Dhaka - Farmgate</option>
            <option>Narayanganj</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Landmark (Optional)</label>
          <input
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
            className="bg-black border border-gray-600 w-full px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Zone</label>
          <select
            name="zone"
            value={form.zone}
            onChange={handleChange}
            className="bg-black border border-gray-600 w-full px-2 py-1 rounded"
          >
            <option value="">Select</option>
            <option>Daudkandi Eliotganj</option>
            <option>Farmgate</option>
            <option>Murapara</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="bg-black border border-gray-600 w-full px-2 py-1 rounded"
          />
        </div>

        <div className="md:col-span-2 mt-2">
          <label className="block mb-1">
            Select a label for effective delivery:
          </label>
          <div className="flex gap-4 mt-1">
            <button
              type="button"
              className={`px-4 py-2 rounded border flex items-center gap-1 ${
                form.label === 'OFFICE'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-gray-600'
              }`}
              onClick={() => setForm({ ...form, label: 'OFFICE' })}
            >
              👜 OFFICE
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded border flex items-center gap-1 ${
                form.label === 'HOME'
                  ? 'border-red-500 text-red-400'
                  : 'border-gray-600'
              }`}
              onClick={() => setForm({ ...form, label: 'HOME' })}
            >
              🏠 HOME
            </button>
          </div>
        </div>

        <div className="md:col-span-2 text-right mt-4">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded text-white font-semibold"
          >
            SAVE ADDRESS
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAddressForm;





