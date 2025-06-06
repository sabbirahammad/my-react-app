import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';
import AccountInfoBoxes from './AccountInfoBoxes';
import RecentOrdersTable from './RecentOrdersTable';
import ProfileEditForm from './ProfileEditForm';
import EditAddressForm from './EditAddressForm';
import PaymentOption from './PaymentOption';
import MyReturns from './MyReturns';
import MyCancellations from './MyCancellations';
import OrderDetailsPage from './OrderDetailsPage';
import MyReviews from './MyReviews';
import MyWishlist from './MyWishlist';
import AllOrders from './AllOrders';
import Navbar from '../Products/Navbar';
import SearchBar from './Searchbar';

const DashboardPage = () => {
  const navigate = useNavigate();

  const [addressList, setAddressList] = useState([]);
  const [profile, setProfile] = useState({
    name: 'Sabbir Ahammad',
    email: '@',
    phone: '017139***',
    birthday: { day: '', month: '', year: '' },
    gender: '',
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');

  // Load from localStorage
  useEffect(() => {
    const savedAddresses = localStorage.getItem('addressList');
    const savedProfile = localStorage.getItem('profile');

    if (savedAddresses) {
      setAddressList(JSON.parse(savedAddresses));
    } else {
      setAddressList([
        {
          name: 'Sabbir Ahammad',
          tag: 'HOME',
          address: 'Elliotgonj Bazar',
          postcode: 'Chattogram - Comilla - Daudkandi - Daudkandi Eliotganj',
          phone: '01752551135',
          isDefault: true,
        },
      ]);
    }

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Persist changes
  useEffect(() => {
    localStorage.setItem('addressList', JSON.stringify(addressList));
  }, [addressList]);

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  return (
    <div>
      <Navbar/>
      <SearchBar/>
      <div className="flex bg-[#0a0a13] min-h-screen text-white">
      <SidebarMenu />

      <div className="flex-1 overflow-y-auto pb-10 p-4">
        <Routes>
          <Route
            path="/dashboard"
            element={
              <>
                <AccountInfoBoxes
                  addressList={addressList}
                  setAddressList={setAddressList}
                  profile={profile}
                  setProfile={setProfile}
                />
                <RecentOrdersTable />
              </>
            }
          />

          <Route
            path="/profilecart"
            element={
              <ProfileEditForm
                profile={profile}
                setProfile={setProfile}
                onSave={() => navigate('/dashboard')}
              />
            }
          />

          <Route
            path="/addresses"
            element={
              <EditAddressForm
                initialData={null}
                onBack={() => navigate('/dashboard')}
                onSave={(newAddress) => {
                  setAddressList((prev) => [...prev, newAddress]);
                  navigate('/dashboard');
                }}
              />
            }
          />

          <Route
            path="/payments"
            element={
              <PaymentOption
                selectedMethod={selectedPaymentMethod}
                onSelect={setSelectedPaymentMethod}
              />
            }
          />

          {/* fallback route */}
          <Route
            path="*"
            element={
              <>
                <AccountInfoBoxes
                  addressList={addressList}
                  setAddressList={setAddressList}
                  profile={profile}
                  setProfile={setProfile}
                />
                <RecentOrdersTable />
              </>
            }
          />
          <Route path='/returns' element={<MyReturns/>}/>
          <Route path='/cancellations' element={<MyCancellations/>}/>
          <Route path="/order/:id" element={<OrderDetailsPage />} />
          <Route path="/reviews" element={<MyReviews />} />
          <Route path="/wishlist" element={<MyWishlist />} />
          <Route path="/orders" element={<AllOrders />} />
        </Routes>
            
      </div>
      
    </div>
    </div>
  );
};

export default DashboardPage;







