import React, { useState } from 'react';
import { 
  X, ShoppingBag, MessageCircle, AlertCircle, CheckCircle2, 
  Building2, ShieldCheck, Thermometer, Info, ChevronRight, Package 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductDetailModal() {
  const { 
    activeProductModal, 
    setActiveProductModal, 
    addToCart, 
    setIsB2BModalOpen, 
    setB2bTargetProduct 
  } = useCart();

  const product = activeProductModal;
  const [quantity, setQuantity] = useState(product?.moq || 1);

  if (!product) return null;

  // Dynamic Tier pricing logic
  const isWholesaleApplied = quantity >= product.moq;
  const unitPrice = isWholesaleApplied ? product.wholesalePrice : product.price;
  const totalPrice = unitPrice * quantity;
  const savings = (product.price * quantity) - totalPrice;

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hello Sigma Medex,\nI am interested in placing an order for:\n*Product:* ${product.name}\n*Generic Salt:* ${product.genericName}\n*Quantity:* ${quantity} Units\n*MOQ:* ${product.moq}\nPlease share wholesale quote and dispatch time.`
    );
    window.open(`https://wa.me/918047302413?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-teal-100 text-teal-800">
              {product.category}
            </span>
            {product.prescriptionRequired ? (
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-rose-100 text-rose-800 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-rose-600" />
                Prescription (Rx) Required
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                OTC Medicine
              </span>
            )}
          </div>
          <button
            onClick={() => setActiveProductModal(null)}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Image Column */}
            <div className="md:col-span-5">
              <div className="aspect-square rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 shadow-sm relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md rounded-xl p-2 text-white text-[11px] text-center">
                  WHO-GMP Tested Formulation
                </div>
              </div>

              {/* Manufacturer & Packing info */}
              <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-400">Manufacturer:</span>
                  <span className="font-bold text-slate-900">{product.manufacturer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Packaging:</span>
                  <span className="font-bold text-slate-900">{product.packSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Min. Order (MOQ):</span>
                  <span className="font-bold text-teal-700">{product.moq} Units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Stock Status:</span>
                  <span className="font-bold text-emerald-600">In Stock ({product.stock})</span>
                </div>
              </div>
            </div>

            {/* Details & Tier Price Column */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {product.name}
                </h2>
                <p className="text-sm font-semibold text-teal-800 mt-1">
                  Active Salt: {product.genericName}
                </p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Dynamic Tier Pricing Table */}
              <div className="bg-gradient-to-br from-teal-50/70 to-slate-50 border border-teal-200/80 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-teal-950 uppercase tracking-wide">
                    Wholesale Tiered Pricing
                  </span>
                  {isWholesaleApplied && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-600 text-white">
                      Wholesale Rate Active
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`p-2.5 rounded-xl border transition ${
                    !isWholesaleApplied 
                      ? 'bg-white border-teal-500 shadow-sm' 
                      : 'bg-white/60 border-slate-200'
                  }`}>
                    <span className="block text-[11px] text-slate-500">Retail / Sample (&lt;{product.moq} units)</span>
                    <span className="text-base font-black text-slate-900">₹{product.price}</span>
                    <span className="text-[10px] text-slate-400 block">/ unit</span>
                  </div>

                  <div className={`p-2.5 rounded-xl border transition ${
                    isWholesaleApplied 
                      ? 'bg-emerald-50 border-emerald-500 shadow-sm' 
                      : 'bg-white/60 border-slate-200'
                  }`}>
                    <span className="block text-[11px] text-emerald-800 font-bold">Wholesale Tier (≥{product.moq} units)</span>
                    <span className="text-base font-black text-emerald-700">₹{product.wholesalePrice}</span>
                    <span className="text-[10px] text-emerald-600 block">Save ₹{product.price - product.wholesalePrice}/unit</span>
                  </div>
                </div>

                {/* Quantity Controller & Price Preview */}
                <div className="mt-4 pt-3 border-t border-teal-200/50 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-slate-700">Select Qty:</span>
                    <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-sm">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 text-center text-xs font-bold text-slate-900 border-none focus:outline-none"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 block">Calculated Total</span>
                    <span className="text-lg font-black text-slate-900">₹{totalPrice}</span>
                    {savings > 0 && (
                      <span className="text-[10px] font-bold text-emerald-600 block">
                        Saved ₹{savings}!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    setActiveProductModal(null);
                  }}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {quantity} {quantity > 1 ? 'Units' : 'Unit'} to Cart • ₹{totalPrice}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setB2bTargetProduct(product);
                      setActiveProductModal(null);
                      setIsB2BModalOpen(true);
                    }}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Request Formal Quote</span>
                  </button>

                  <button
                    onClick={handleWhatsAppEnquiry}
                    className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Inquiry</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Clinical & Formulation Details */}
          <div className="border-t border-slate-200 pt-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-teal-600" />
              Formulation & Prescribing Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="font-bold text-slate-800 block mb-0.5">Composition:</span>
                <p className="text-slate-600">{product.composition}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="font-bold text-slate-800 block mb-0.5">Storage Instruction:</span>
                <p className="text-slate-600">{product.storage}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
