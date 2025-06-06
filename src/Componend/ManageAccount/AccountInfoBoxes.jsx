import React, { useState } from 'react';
import EditAddressForm from './EditAddressForm';
import ProfileEditForm from './ProfileEditForm';

const AccountInfoBoxes = ({ addressList, setAddressList, profile, setProfile }) => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddressTable, setEditingAddressTable] = useState(false);
  const [editingAddressForm, setEditingAddressForm] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  return (
    <div className="flex-1 text-[11px] text-white px-4 pt-4 space-y-4">
      <h2 className="text-[16px] font-semibold mb-2">Manage My Account</h2>

      {/* PERSONAL PROFILE SECTION */}
      <div className="bg-[#0d0f1c] p-4 rounded shadow-sm">
        <h3 className="font-semibold mb-2 text-[12px]">
          Personal Profile{' '}
          {!editingProfile && (
            <span
              className="text-blue-400 cursor-pointer text-[10px]"
              onClick={() => setEditingProfile(true)}
            >
              | EDIT
            </span>
          )}
        </h3>

        {editingProfile ? (
          <ProfileEditForm
            profile={profile}
            setProfile={setProfile}
            onSave={() => setEditingProfile(false)}
          />
        ) : (
          <>
            <p className="mb-1">{profile.name}</p>
            <p className="mb-1">{profile.email}</p>
            <p className="mb-1">{profile.phone}</p>
            <p className="mb-1">{profile.birthday.month} {profile.birthday.day}, {profile.birthday.year}</p>
            <p className="mb-2">{profile.gender}</p>
            <label className="flex items-center gap-1 text-[10px]">
              <input type="checkbox" className="accent-yellow-500" />
              Receive marketing SMS
            </label>
          </>
        )}
      </div>

      {/* ADDRESS SECTION */}
      {editingAddressForm ? (
        <EditAddressForm
          initialData={selectedAddressIndex !== null ? addressList[selectedAddressIndex] : null}
          onBack={() => setEditingAddressForm(false)}
          onSave={(updatedAddress) => {
            setAddressList((prev) => {
              if (selectedAddressIndex !== null) {
                const updated = [...prev];
                updated[selectedAddressIndex] = updatedAddress;
                return updated;
              } else {
                return [updatedAddress, ...prev];
              }
            });
            setSelectedAddressIndex(null);
            setEditingAddressForm(false);
          }}
        />
      ) : !editingAddressTable ? (
        <div className="bg-[#0d0f1c] p-4 rounded shadow-sm">
          <h3 className="font-semibold mb-2 text-[12px]">
            Address Book{' '}
            <span
              className="text-blue-400 cursor-pointer text-[10px]"
              onClick={() => setEditingAddressTable(true)}
            >
              | EDIT
            </span>
          </h3>
          <p className="text-[10px] text-gray-400">DEFAULT SHIPPING ADDRESS</p>
          <p className="font-semibold mt-1">{addressList.find((addr) => addr.isDefault)?.name || ''}</p>
          <p className="leading-tight text-[10px] text-gray-300">
            {addressList.find((addr) => addr.isDefault)?.address || ''}<br />
            {addressList.find((addr) => addr.isDefault)?.postcode || ''}<br />
            (+880) {addressList.find((addr) => addr.isDefault)?.phone || ''}
          </p>
        </div>
      ) : (
        <div className="bg-[#0d0f1c] rounded overflow-x-auto p-4">
          <div className="grid grid-cols-5 px-2 py-2 border-b border-gray-800 font-semibold text-gray-300">
            <span>Full Name</span>
            <span>Address</span>
            <span>Postcode</span>
            <span>Phone Number</span>
            <span></span>
          </div>

          {addressList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 px-2 py-3 border-b border-gray-800 items-center"
            >
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                <span className="bg-orange-600 text-white text-[9px] font-semibold px-2 py-0.5 rounded-full">
                  {item.tag || 'HOME'}
                </span>
                <span>{item.address}</span>
              </div>
              <span>{item.postcode}</span>
              <span>{item.phone}</span>
              <div className="flex flex-col items-end text-right">
                {item.isDefault && (
                  <>
                    <span className="text-gray-400">Default Shipping Address</span>
                    <span className="text-gray-400 -mt-1">Default Billing Address</span>
                  </>
                )}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedAddressIndex(index);
                    setEditingAddressForm(true);
                  }}
                  className="text-blue-400 mt-1 text-[11px]"
                >
                  EDIT
                </a>
              </div>
            </div>
          ))}

          <div className="text-right mt-4">
            <button
              className="bg-cyan-600 hover:bg-cyan-700 text-white text-[11px] font-semibold px-4 py-2 rounded"
              onClick={() => {
                setSelectedAddressIndex(null);
                setEditingAddressForm(true);
              }}
            >
              + ADD NEW ADDRESS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountInfoBoxes;
