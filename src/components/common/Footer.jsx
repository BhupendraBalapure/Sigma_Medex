import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { CATEGORIES } from '../../data/initialProducts';
import { useProducts } from '../../context/ProductContext';

export default function Footer({ onNavigate }) {
  const { setSelectedCategory } = useProducts();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-10 border-b border-slate-800/80">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-6 h-6 text-teal-400 flex-shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm">GST & Drug Verified</h4>
              <p className="mt-0.5 text-slate-500">GST: 27AEPFS7579K1ZW with valid wholesale drug licenses.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm">WHO-GMP Standard</h4>
              <p className="mt-0.5 text-slate-500">All medicines sourced from audited pharmaceutical manufacturers.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="w-6 h-6 text-sky-400 flex-shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm">100% Response Rate</h4>
              <p className="mt-0.5 text-slate-500">Fast quote dispatch within 2-4 hours for wholesale buyers.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm">Direct Desk</h4>
              <p className="mt-0.5 text-slate-500">Call 08047302413 / WhatsApp for instant inquiry fulfillment.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b border-slate-800/80">
          
          {/* Company Bio */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-white">Sigma</span>
              <span className="text-xl font-black text-teal-400">Medex</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Established in 2016 in Nagpur, Maharashtra, Sigma Medex is a trusted pharmaceutical wholesaler, trader, distributor, and exporter supplying high-efficacy prescription tablets, injections, oncology medications, and bulk pharmaceuticals worldwide.
            </p>
            <div className="text-[11px] text-slate-500 pt-2 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Nagpur, Maharashtra, India - 440010
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                sales@sigmamedex.com
              </p>
            </div>
          </div>

          {/* Product Categories */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Medicine Categories
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES.slice(1).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    if (onNavigate) onNavigate('store');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="text-left text-slate-400 hover:text-teal-400 transition"
                >
                  • {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Business & Legal */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Compliance & Wholesale Trade
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• IndiaMART Verified Premium Trader</li>
              <li>• Payment Protected Buyer Safe Escrow</li>
              <li>• Wholesale Dropshipping Services</li>
              <li>• Certificate of Analysis (COA) Provided</li>
              <li>• B2B GST Tax Invoice on every shipment</li>
            </ul>

            <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-teal-300">
              ⚡ Minimum Order Quantity (MOQ) rates apply automatically when ordering wholesale quantities.
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Sigma Medex Wholesale & Retail Commerce. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span>Terms of Wholesale Supply</span>
            <span>Privacy Policy</span>
            <span>Schedule H Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
