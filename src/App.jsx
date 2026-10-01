import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider, useCart } from './context/CartContext';

// Common components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';

// Auth modals
import LoginModal from './components/auth/LoginModal';
import RegisterModal from './components/auth/RegisterModal';

// Storefront components
import HeroBanner from './components/store/HeroBanner';
import CategoryGrid from './components/store/CategoryGrid';
import ProductCatalog from './components/store/ProductCatalog';
import ProductDetailModal from './components/store/ProductDetailModal';
import CartDrawer from './components/store/CartDrawer';
import CheckoutModal from './components/store/CheckoutModal';
import MyOrdersModal from './components/store/MyOrdersModal';
import PrescriptionModal from './components/store/PrescriptionModal';
import B2BQuoteModal from './components/store/B2BQuoteModal';

// Admin components
import AdminDashboard from './components/admin/AdminDashboard';

function AppContent() {
  const [currentView, setCurrentView] = useState('store'); // 'store' | 'admin'
  const { isOrdersModalOpen, setIsOrdersModalOpen } = useCart();

  const handleScrollToCatalog = () => {
    setCurrentView('store');
    const catalogElement = document.getElementById('product-catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      {/* Universal Navbar */}
      <Navbar onNavigate={setCurrentView} currentView={currentView} />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'admin' ? (
          <AdminDashboard onNavigate={setCurrentView} />
        ) : (
          <div>
            <HeroBanner onBrowseClick={handleScrollToCatalog} />
            <CategoryGrid onSelectCategory={() => handleScrollToCatalog()} />
            <div id="product-catalog">
              <ProductCatalog />
            </div>
          </div>
        )}
      </main>

      {/* Modals & Slide-overs */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <MyOrdersModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
      />
      <PrescriptionModal />
      <B2BQuoteModal />
      <LoginModal />
      <RegisterModal />

      {/* Floating 1-Click WhatsApp Quick Desk */}
      <WhatsAppButton />

      {/* Footer */}
      <Footer onNavigate={setCurrentView} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
