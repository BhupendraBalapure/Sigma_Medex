import React from 'react';
import { Pill, Syringe, ShieldAlert, Sparkles, HeartPulse, Activity, Layers } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { CATEGORIES } from '../../data/initialProducts';

const ICON_MAP = {
  Pill: Pill,
  Tablet: Pill,
  Capsule: Layers,
  Syringe: Syringe,
  Activity: Activity,
  ShieldAlert: ShieldAlert,
  Sparkles: Sparkles,
  HeartPulse: HeartPulse,
};

export default function CategoryGrid({ onSelectCategory }) {
  const { selectedCategory, setSelectedCategory, products } = useProducts();

  // Calculate count per category
  const getCategoryCount = (catId) => {
    if (catId === 'all') return products.length;
    return products.filter(p => p.category === catId).length;
  };

  return (
    <section className="py-8 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Therapeutic & Dosage Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Wholesale distribution across tablets, injectables, and critical care
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              if (onSelectCategory) onSelectCategory('all');
            }}
            className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline"
          >
            View All ({products.length})
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Pill;
            const isSelected = selectedCategory === cat.id;
            const count = getCategoryCount(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (onSelectCategory) onSelectCategory(cat.id);
                }}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition group relative ${
                  isSelected
                    ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-sm'
                    : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 transition group-hover:scale-110 ${
                  isSelected
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-slate-700 shadow-sm border border-slate-200 group-hover:bg-teal-50 group-hover:text-teal-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold line-clamp-1 text-slate-800">
                  {cat.name}
                </span>
                <span className={`text-[10px] font-semibold mt-0.5 ${
                  isSelected ? 'text-teal-700' : 'text-slate-400'
                }`}>
                  {count} Products
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
