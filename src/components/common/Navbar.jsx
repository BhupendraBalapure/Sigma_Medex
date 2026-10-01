import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Search, ShoppingBag, FileText, Phone, ShieldCheck, 
  User, LogOut, LayoutDashboard, ChevronDown, CheckCircle2,
  Store, PlusCircle, Sparkles, MessageCircle, Package
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { CATEGORIES } from '../../data/initialProducts';

export default function Navbar({ onNavigate, currentView }) {
  const { currentUser, isLoggedIn, isAdmin, logout, switchRole } = useAuth();
  const { 
    cartCount, 
    cartSubtotal, 
    orders,
    setIsCartOpen, 
    setIsOrdersModalOpen,
    setIsPrescriptionModalOpen, 
    setIsB2BModalOpen, 
    setB2bTargetProduct,
    setIsLoginModalOpen,
    setIsRegisterModalOpen 
  } = useCart();
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    products 
  } = useProducts();

  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const searchRef = useRef(null);

  // Filter search suggestions
  const searchSuggestions = React.useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.genericName?.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [searchQuery, products]);

  // Click outside listener for search dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Compliance & Trust Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-teal-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              GST No: <strong className="text-white">27AEPFS7579K1ZW</strong>
            </span>
            <span className="hidden sm:inline-block text-slate-400">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              WHO-GMP Verified Exporter & Distributor
            </span>
            <span className="hidden md:inline-block text-slate-400">|</span>
            <span className="hidden md:flex items-center gap-1 text-sky-400 font-medium">
              <Phone className="w-3.5 h-3.5" />
              Wholesale Desk: 08047302413 (100% Response Rate)
            </span>
          </div>

          {/* Quick Demo Role Switcher for seamless testing */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 hidden lg:inline">Quick Role Test:</span>
            <button
              onClick={() => switchRole('admin')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition ${
                isAdmin 
                  ? 'bg-amber-500 text-slate-950 font-bold' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Admin Mode
            </button>
            <button
              onClick={() => switchRole('customer')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition ${
                isLoggedIn && !isAdmin 
                  ? 'bg-teal-500 text-white font-bold' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Buyer Mode
            </button>
            {isLoggedIn && (
              <button
                onClick={() => {
                  logout();
                  setShowUserDropdown(false);
                  onNavigate('store');
                }}
                className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-600/90 hover:bg-rose-600 text-white transition flex items-center gap-1 shadow-sm"
                title="Logout immediately"
              >
                <LogOut className="w-3 h-3" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('store')} 
          className="flex items-center space-x-3 cursor-pointer group flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-sky-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition">
            <Sparkles className="w-5 h-5 text-teal-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-slate-900">Sigma</span>
              <span className="text-2xl font-black tracking-tight text-teal-600">Medex</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">
              Pharmaceutical Wholesale & Export
            </p>
          </div>
        </div>

        {/* Live Search Bar with Composition/Salt auto-suggest */}
        <div className="flex-1 max-w-2xl relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Medicine Name or Salt (e.g. Semaglutide, Isotretinoin, Dutaheal)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium bg-slate-200 px-2 py-0.5 rounded-full"
              >
                Clear
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {showSearchDropdown && searchSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 divide-y divide-slate-100">
              <div className="px-4 py-2 bg-slate-50 text-xs font-semibold text-slate-500 flex justify-between">
                <span>Matching Medicines & Formulations</span>
                <span>{searchSuggestions.length} found</span>
              </div>
              {searchSuggestions.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSearchQuery(item.name);
                    setShowSearchDropdown(false);
                    onNavigate('store');
                  }}
                  className="px-4 py-3 hover:bg-teal-50/60 cursor-pointer flex items-center justify-between transition"
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80";
                      }}
                      className="w-10 h-10 object-cover rounded-lg border border-slate-200" 
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{item.name}</h4>
                      <p className="text-xs text-teal-700 font-medium">{item.genericName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">₹{item.price}</span>
                    <span className="block text-[11px] text-emerald-600 font-semibold">Bulk: ₹{item.wholesalePrice}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Upload Prescription Button */}
          <button
            onClick={() => setIsPrescriptionModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 rounded-xl text-xs font-semibold transition"
          >
            <FileText className="w-4 h-4 text-sky-600" />
            <span>Upload Rx</span>
          </button>

          {/* B2B Quote Button */}
          <button
            onClick={() => {
              setB2bTargetProduct(null);
              setIsB2BModalOpen(true);
            }}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 rounded-xl text-xs font-semibold transition"
          >
            <MessageCircle className="w-4 h-4 text-teal-600" />
            <span>Bulk Quote</span>
          </button>

          {/* Admin Switcher / Direct Access */}
          {isAdmin ? (
            <button
              onClick={() => onNavigate(currentView === 'admin' ? 'store' : 'admin')}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition"
            >
              {currentView === 'admin' ? (
                <>
                  <Store className="w-4 h-4" />
                  <span className="hidden sm:inline">Storefront</span>
                </>
              ) : (
                <>
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin Dashboard</span>
                </>
              )}
            </button>
          ) : null}

          {/* User Account Menu */}
          <div className="relative">
            {isLoggedIn ? (
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-medium text-slate-800 transition"
              >
                <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            {/* User Dropdown */}
            {showUserDropdown && isLoggedIn && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-teal-100 text-teal-800">
                    {currentUser.role}
                  </span>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onNavigate('admin');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-600" />
                    <span>Admin Dashboard</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    setIsOrdersModalOpen(true);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2"
                >
                  <Package className="w-4 h-4 text-teal-600" />
                  <span>My Orders ({orders.length})</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    onNavigate('store');
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2"
                >
                  <Store className="w-4 h-4 text-teal-600" />
                  <span>Browse Products</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setShowUserDropdown(false);
                    onNavigate('store');
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 mt-1 border-t border-slate-100 font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-600/20 transition group"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition" />
            <span className="hidden sm:inline">₹{cartSubtotal}</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="bg-slate-50 border-t border-slate-200/80 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 sm:space-x-2 py-1.5 text-xs font-medium whitespace-nowrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                if (currentView !== 'store') onNavigate('store');
              }}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedCategory === cat.id
                  ? 'bg-teal-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
