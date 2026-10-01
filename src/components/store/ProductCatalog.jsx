import React from 'react';
import { Filter, SlidersHorizontal, AlertCircle, X, Search, Check } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from './ProductCard';

export default function ProductCatalog() {
  const { 
    filteredProducts, 
    selectedCategory, 
    setSelectedCategory,
    filterRxOnly, 
    setFilterRxOnly,
    sortBy, 
    setSortBy,
    searchQuery,
    setSearchQuery,
    products
  } = useProducts();

  const hasActiveFilters = selectedCategory !== 'all' || filterRxOnly || searchQuery.trim() !== '';

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setFilterRxOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section className="py-10 bg-slate-50 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Catalog Control Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Results Count & Active Info */}
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-bold text-slate-900">
              Medicines & Formulations
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
              {filteredProducts.length} Available
            </span>
          </div>

          {/* Right: Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            {/* Prescription Toggle */}
            <button
              onClick={() => setFilterRxOnly(!filterRxOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition ${
                filterRxOnly
                  ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <AlertCircle className={`w-3.5 h-3.5 ${filterRxOnly ? 'text-rose-600' : 'text-slate-400'}`} />
              <span>Rx Only</span>
              {filterRxOnly && <Check className="w-3.5 h-3.5 text-rose-600" />}
            </button>

            {/* Sort selector */}
            <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical (A - Z)</option>
              </select>
            </div>

            {/* Clear filters button */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Indicators */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="text-slate-400 font-medium">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 font-semibold flex items-center gap-1">
                Category: {selectedCategory}
                <X className="w-3 h-3 cursor-pointer hover:text-teal-950" onClick={() => setSelectedCategory('all')} />
              </span>
            )}
            {filterRxOnly && (
              <span className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 font-semibold flex items-center gap-1">
                Prescription Required
                <X className="w-3 h-3 cursor-pointer hover:text-rose-950" onClick={() => setFilterRxOnly(false)} />
              </span>
            )}
            {searchQuery && (
              <span className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 font-semibold flex items-center gap-1">
                Search: "{searchQuery}"
                <X className="w-3 h-3 cursor-pointer hover:text-sky-950" onClick={() => setSearchQuery('')} />
              </span>
            )}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No matching medicines found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any products matching your current filters or search query "{searchQuery}".
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-5 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
