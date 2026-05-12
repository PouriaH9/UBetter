"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/cart-context";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import { PRODUCT_IMAGES } from "@/assets/productImages";
import type { Locale } from "@/i18n/config";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";

export default function CartDrawer({ locale }: { locale: Locale }) {
  const { items, totalQty, open, closeCart, removeItem, setQty, clearCart } = useCart();
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const isRTL = locale === "fa";

  const tx = (s: { fa: string; en: string }) => (isRTL ? s.fa : s.en);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9000]"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            key="cart-panel"
            initial={{ x: isRTL ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "-100%" : "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 bottom-0 z-[9001] flex flex-col w-full max-w-[400px]"
            style={{
              ...(isRTL ? { left: 0 } : { right: 0 }),
              background: isDark ? "rgba(8,8,8,0.98)" : "rgba(250,250,250,0.99)",
              backdropFilter: "blur(24px)",
              borderLeft: isRTL ? "none" : `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
              borderRight: isRTL ? `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` : "none",
            }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` }}>
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: C.accent }}>
                  <path d="M2.5 2.5h1.667l2.666 8.333h8.334l2-6.666H6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="8.5" cy="14.5" r="1" fill="currentColor" />
                  <circle cx="13.5" cy="14.5" r="1" fill="currentColor" />
                </svg>
                <span style={{ fontFamily: YK, fontSize: "16px", fontWeight: 700, color: C.text1 }}>
                  {isRTL ? "سبد خرید" : "Shopping Cart"}
                </span>
                {totalQty > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black"
                    style={{ background: C.accent, color: isDark ? "#000" : "#fff" }}>
                    {totalQty}
                  </span>
                )}
              </div>
              <button onClick={closeCart} className="p-2 rounded-full transition-colors duration-200"
                style={{ color: C.text3 }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.text1; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.text3; }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 opacity-40 py-16">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ color: C.text3 }}>
                    <path d="M6 6h4l6.4 20h20l4.8-16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="20" cy="38" r="2.5" fill="currentColor" />
                    <circle cx="32" cy="38" r="2.5" fill="currentColor" />
                  </svg>
                  <span style={{ fontFamily: YK, fontSize: "14px", color: C.text3 }}>
                    {isRTL ? "سبد خرید خالی است" : "Your cart is empty"}
                  </span>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => {
                    const img = PRODUCT_IMAGES[item.productNum] ?? null;
                    return (
                      <motion.div
                        key={item.productNum}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        className="flex items-center gap-3 rounded-2xl p-3"
                        style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}` }}
                      >
                        {/* Image */}
                        <div className="shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
                          style={{ width: 64, height: 64, background: "#fff" }}>
                          {img ? (
                            <div className="relative w-full h-full">
                              <Image src={img} alt={tx(item.name)} fill sizes="64px" className="object-contain p-1.5" />
                            </div>
                          ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: C.text3, opacity: 0.3 }}>
                              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold leading-snug line-clamp-2" style={{ fontFamily: YK, fontSize: "12px", color: C.text1 }}>
                            {tx(item.name)}
                          </p>
                          <p style={{ fontFamily: YK, fontSize: "10px", color: C.text3, marginTop: 2 }}>
                            {tx(item.category)}
                          </p>

                          {/* Qty controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => setQty(item.productNum, item.qty - 1)}
                              className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors duration-150"
                              style={{ border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`, color: C.text2 }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.accent; (e.currentTarget as HTMLButtonElement).style.color = C.accent; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = C.text2; }}
                            >
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                            </button>
                            <span className="font-bold text-[13px] min-w-[20px] text-center" style={{ color: C.text1, fontFamily: "'Inter', system-ui" }}>{item.qty}</span>
                            <button
                              onClick={() => setQty(item.productNum, item.qty + 1)}
                              className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors duration-150"
                              style={{ border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`, color: C.text2 }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.accent; (e.currentTarget as HTMLButtonElement).style.color = C.accent; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = C.text2; }}
                            >
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2v6M2 5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                            </button>
                          </div>
                        </div>

                        {/* Remove */}
                        <button onClick={() => removeItem(item.productNum)}
                          className="shrink-0 p-1.5 rounded-lg transition-colors duration-150"
                          style={{ color: C.text3 }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.text3; }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 4h10M5 4V3h4v1M5.5 6.5v4M8.5 6.5v4M3 4l.7 7.5h6.6L11 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 space-y-3" style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` }}>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: YK, fontSize: "13px", color: C.text3 }}>
                    {isRTL ? `${totalQty} محصول انتخاب شده` : `${totalQty} item${totalQty !== 1 ? "s" : ""} selected`}
                  </span>
                  <button onClick={clearCart} className="text-[11px] transition-colors duration-150" style={{ color: C.text3, fontFamily: YK }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.text3; }}>
                    {isRTL ? "پاک کردن همه" : "Clear all"}
                  </button>
                </div>
                <button className="w-full py-3.5 rounded-2xl font-bold text-[14px] transition-all duration-200 flex items-center justify-center gap-2"
                  style={{ background: C.accent, color: isDark ? "#000" : "#fff", fontFamily: YK }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {isRTL ? "ادامه و ثبت درخواست" : "Proceed to Enquiry"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
