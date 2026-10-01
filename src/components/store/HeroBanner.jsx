import React from 'react';
import { ShieldCheck, Truck, Award, CheckCircle, ArrowRight, FileText, PhoneCall, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function HeroBanner({ onBrowseClick }) {
  const { setIsPrescriptionModalOpen, setIsB2BModalOpen, setB2bTargetProduct } = useCart();

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white overflow-hidden py-12 md:py-16 px-4">
      {/* Background glowing decorations */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Certified Pharmaceutical Wholesaler & Exporter • Nagpur, India</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Direct From Manufacturer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-sky-300 to-teal-200">
                Pharmaceuticals & Specialty Drugs
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Supplier of premium pharmaceutical tablets, softgels, oncology injections, antibiotics, and dermatology formulations. Trusted by over <strong>1,200+ hospitals, pharmacies & export partners</strong> worldwide.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBrowseClick}
                className="px-6 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-teal-500/25 flex items-center gap-2 transform active:scale-95 transition"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setB2bTargetProduct(null);
                  setIsB2BModalOpen(true);
                }}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm rounded-2xl backdrop-blur-md flex items-center gap-2 transition"
              >
                <PhoneCall className="w-4 h-4 text-sky-400" />
                <span>Request B2B Wholesale Quote</span>
              </button>

              <button
                onClick={() => setIsPrescriptionModalOpen(true)}
                className="px-5 py-3.5 bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 border border-sky-400/30 font-semibold text-sm rounded-2xl flex items-center gap-2 transition"
              >
                <FileText className="w-4 h-4 text-sky-300" />
                <span>Upload Rx</span>
              </button>
            </div>

            {/* Key Quality Assurances */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4 text-teal-400" />
                100% Genuine Batch Tested
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4 text-teal-400" />
                Valid Drug License & GST Bill
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4 text-teal-400" />
                India & Global Export Delivery
              </span>
            </div>
          </div>

          {/* Quick Wholesale Promo Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-wider uppercase text-teal-300 bg-teal-900/60 px-2.5 py-1 rounded-lg">
                  Wholesale Procurement Advantage
                </span>
                <span className="text-xs font-semibold text-slate-300">GST: 27AEPFS7579K1ZW</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3.5 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <Award className="w-7 h-7 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Tiered Volume Pricing</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Order at standard retail or unlock up to <strong>35% off</strong> on Minimum Order Quantities (MOQ).
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <Truck className="w-7 h-7 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Cold-Chain Temperature Logistics</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Strict 2°C – 8°C monitored shipping for critical biologics, injections & peptides.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <ShieldCheck className="w-7 h-7 text-teal-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct Export & Dropshipping</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Door-to-door international dropshipping service for foreign pharmacy clients.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>Direct Helpline: <strong className="text-white">+91 8047302413</strong></span>
                <span className="text-emerald-400 font-bold">● Fast Dispatch</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
