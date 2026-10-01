import React from 'react';
import { ShoppingBag, MessageCircle, AlertCircle, Check, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { 
    addToCart, 
    setIsB2BModalOpen, 
    setB2bTargetProduct,
    setActiveProductModal 
  } = useCart();

  const discountPercent = Math.round(
    ((product.price - product.wholesalePrice) / product.price) * 100
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
        onClick={() => setActiveProductModal(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80";
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.prescriptionRequired ? (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-sm flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Rx Required
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-sm">
              OTC / Non-Rx
            </span>
          )}

          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-amber-500 text-slate-950 shadow-sm">
              Wholesale: Save {discountPercent}%
            </span>
          )}
        </div>

        {/* MOQ Tag */}
        <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow">
          MOQ: {product.moq} {product.moq > 1 ? 'Units' : 'Unit'}
        </div>

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-slate-800 shadow flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition">
            <Eye className="w-3.5 h-3.5 text-teal-600" />
            View Details
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-semibold uppercase text-[10px] tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
            {product.category}
          </span>
          <span className="text-[11px] font-medium truncate max-w-[120px]">
            {product.manufacturer}
          </span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => setActiveProductModal(product)}
          className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1 group-hover:text-teal-600 cursor-pointer transition"
        >
          {product.name}
        </h3>

        {/* Generic Chemical Composition / Salt */}
        <p className="text-xs text-teal-800 font-medium line-clamp-1 mt-0.5">
          Salt: {product.genericName}
        </p>

        {/* Pack Size */}
        <p className="text-[11px] text-slate-500 mt-1">
          Packing: <strong className="text-slate-700">{product.packSize}</strong>
        </p>

        {/* Pricing Matrix */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">₹{product.price}</span>
              <span className="text-[11px] text-slate-400 font-medium">/ pack</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-700">
              Bulk: ₹{product.wholesalePrice} <span className="text-[10px] font-normal text-slate-500">(≥{product.moq} MOQ)</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              In Stock: {product.stock}
            </span>
          </div>
        </div>

        {/* Action Buttons: Add to Cart + Send Bulk Enquiry */}
        <div className="mt-4 pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => addToCart(product, 1)}
            className="py-2.5 px-3 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={() => {
              setB2bTargetProduct(product);
              setIsB2BModalOpen(true);
            }}
            className="py-2.5 px-3 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 font-bold text-xs rounded-xl border border-slate-200 hover:border-teal-200 flex items-center justify-center gap-1.5 transition"
          >
            <MessageCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>Bulk Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
}
