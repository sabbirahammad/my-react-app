import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ProductProvider } from './Context/UseContext.jsx';
import { SidebarDataProvider } from './Context/SidebarDataContext.jsx'; // ✅ এটাও ইমপোর্ট করো

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <SidebarDataProvider>
        <App />
      </SidebarDataProvider>
    </ProductProvider>
  </StrictMode>
);

