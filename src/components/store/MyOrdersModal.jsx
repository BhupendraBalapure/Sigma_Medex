import React from 'react';
import { 
  X, Package, CheckCircle2, Clock, Truck, Printer, 
  MapPin, Phone, ShieldCheck, ArrowRight, ShoppingBag 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function MyOrdersModal({ isOpen, onClose }) {
  const { orders } = useCart();
  const { currentUser } = useAuth();

  if (!isOpen) return null;

  // Filter orders for logged-in user or show all current session orders if guest
  const userOrders = currentUser?.email
    ? orders.filter(o => o.email?.toLowerCase() === currentUser.email?.toLowerCase() || !o.email)
    : orders;

  const handlePrint = (orderId) => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">My Pharmaceutical Orders</h3>
              <p className="text-xs text-slate-400">Track shipments, dispatch status & tax invoices</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders List Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-slate-50">
          {userOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800">No orders placed yet</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Once you order medicines from our catalog, you can track their dispatch progress and download GST tax invoices here.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Browse Medicines
              </button>
            </div>
          ) : (
            userOrders.map((order) => {
              const isDispatched = order.orderStatus === 'Dispatched' || order.orderStatus === 'Delivered';
              const isDelivered = order.orderStatus === 'Delivered';

              return (
                <div key={order.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-5 space-y-4">
                  
                  {/* Top Bar: Order ID, Date & Total */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-sm font-black text-slate-900">{order.id}</span>
                        <span className="text-xs text-slate-400 block">Placed on {order.date}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-black ${
                        isDelivered 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : isDispatched 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-sky-100 text-sky-800'
                      }`}>
                        ● {order.orderStatus}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">Total Invoiced</span>
                        <span className="text-base font-black text-teal-700">₹{order.total}</span>
                      </div>
                      <button
                        onClick={() => handlePrint(order.id)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 flex items-center gap-1.5 transition"
                        title="Print Official GST Invoice"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-500" />
                        <span>Print Bill</span>
                      </button>
                    </div>
                  </div>

                  {/* Status Progression Bar */}
                  <div className="py-2">
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <span className="text-teal-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" /> Confirmed
                      </span>
                      <span className={`flex items-center gap-1 ${isDispatched ? 'text-amber-700 font-bold' : 'text-slate-400'}`}>
                        <Truck className="w-4 h-4" /> Dispatched (In Transit)
                      </span>
                      <span className={`flex items-center gap-1 ${isDelivered ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                        <CheckCircle2 className="w-4 h-4" /> Delivered
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-teal-500 via-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: isDelivered ? '100%' : isDispatched ? '65%' : '25%' }}
                      />
                    </div>
                  </div>

                  {/* Items Ordered List */}
                  <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 border border-slate-100">
                    <span className="font-bold text-slate-700 block mb-1">Prescribed Formulations:</span>
                    {order.items?.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-slate-600">
                        <span>• {it.name} <strong className="text-slate-900 font-bold">× {it.quantity}</strong></span>
                        <span className="font-semibold text-slate-800">₹{it.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping & Payment Meta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-500 pt-1">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>{order.shippingAddress}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <span>Payment: <strong className="text-slate-700">{order.paymentMethod}</strong> ({order.paymentStatus})</span>
                      {order.gstin && (
                        <span className="font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                          GST: {order.gstin}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
