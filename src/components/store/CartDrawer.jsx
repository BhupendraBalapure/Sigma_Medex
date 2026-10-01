import React from 'react';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, 
  AlertCircle, ShieldCheck, FileText, CheckCircle2 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    cartSubtotal,
    cartHasRx,
    setIsPrescriptionModalOpen,
    setIsCheckoutOpen,
    prescriptions
  } = useCart();

  if (!isCartOpen) return null;

  const hasAttachedRx = prescriptions.length > 0;
  const gstAmount = Math.round(cartSubtotal * 0.12);
  const finalTotal = cartSubtotal + gstAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Your Medical Cart</h3>
                <p className="text-xs text-slate-500">{cartItems.length} Products added</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Rx Warning Banner if Rx medicines present */}
          {cartHasRx && (
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  {hasAttachedRx ? (
                    <strong className="text-emerald-700 font-bold">✓ Prescription Attached</strong>
                  ) : (
                    <span>Doctor's Prescription required for checkout</span>
                  )}
                </span>
              </div>
              {!hasAttachedRx && (
                <button
                  onClick={() => setIsPrescriptionModalOpen(true)}
                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold rounded-lg transition"
                >
                  Upload
                </button>
              )}
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-slate-700">Your cart is currently empty</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Browse our wholesale pharmaceutical catalog and add medicines to your order.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const isWholesale = item.quantity >= (item.product.moq || 1);
                const currentPrice = isWholesale ? item.product.wholesalePrice : item.product.price;
                const lineTotal = currentPrice * item.quantity;

                return (
                  <div key={item.product.id} className="pt-4 first:pt-0 flex gap-3 items-start">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80";
                      }}
                      className="w-16 h-16 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 p-0.5 ml-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-teal-800 font-medium truncate">
                        {item.product.genericName}
                      </p>

                      {/* Pricing with wholesale indicator */}
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          ₹{currentPrice} <span className="text-[10px] text-slate-400 font-normal">/ unit</span>
                        </span>
                        {isWholesale && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            Wholesale Tier
                          </span>
                        )}
                      </div>

                      {/* Quantity Controller & Line Total */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-600 hover:text-slate-900"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-600 hover:text-slate-900"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-extrabold text-slate-900">
                          ₹{lineTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Pharma GST (12%)</span>
                  <span className="font-semibold text-slate-900">₹{gstAmount}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Wholesale Cold-Chain Delivery</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-base text-teal-700">₹{finalTotal}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg shadow-teal-600/25 flex items-center justify-center gap-2 transition"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={clearCart}
                className="w-full py-1 text-center text-[11px] text-slate-400 hover:text-rose-600 transition"
              >
                Clear Cart
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
