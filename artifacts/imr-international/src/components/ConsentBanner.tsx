import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X, Check, ChevronDown, ChevronUp } from "lucide-react";
import { saveConsent, getConsent } from "@/lib/tracker";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = async () => {
    await saveConsent("accepted");
    setVisible(false);
  };

  const handleReject = async () => {
    await saveConsent("rejected");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="fixed bottom-0 left-0 right-0 z-[9998] p-3 sm:p-4"
        >
          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-400/20 overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500" />

            <div className="p-4 sm:p-5">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-foreground text-sm sm:text-base">
                      Privacy & Cookie Consent
                    </h3>
                    <button
                      onClick={handleReject}
                      className="w-7 h-7 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center flex-shrink-0 transition-colors"
                      aria-label="Dismiss"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    We use anonymous analytics to understand how visitors use our site and improve your experience.
                    <strong className="text-foreground"> No personal data is stored without your consent.</strong>
                  </p>

                  {/* Expandable details */}
                  <button
                    onClick={() => setExpanded(e => !e)}
                    className="flex items-center gap-1 text-blue-600 text-xs font-medium mt-1.5 hover:text-blue-700 transition-colors"
                  >
                    {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {expanded ? "Hide details" : "What do we track?"}
                  </button>

                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {[
                            { icon: "📄", label: "Page views" },
                            { icon: "🖱️", label: "Button clicks" },
                            { icon: "🔀", label: "Navigation paths" },
                            { icon: "⏱️", label: "Session duration" },
                          ].map(item => (
                            <div key={item.label} className="flex items-center gap-1.5 text-xs text-slate-600">
                              <span>{item.icon}</span>
                              <span>{item.label}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-2">
                          All data is anonymised using SHA-256 hashing. You can withdraw consent at any time from the website footer.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 pl-13">
                <button
                  onClick={handleAccept}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                >
                  <Check className="w-4 h-4" />
                  Accept Analytics
                </button>
                <button
                  onClick={handleReject}
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-sm font-medium transition-all"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Footer link — let users withdraw consent at any time
export function WithdrawConsentLink() {
  const consent = getConsent();
  if (consent !== "accepted") return null;

  const handleWithdraw = async () => {
    await saveConsent("withdrawn");
    window.location.reload();
  };

  return (
    <button
      onClick={handleWithdraw}
      className="text-xs text-slate-500 hover:text-slate-700 underline underline-offset-2 transition-colors"
    >
      Withdraw analytics consent
    </button>
  );
}
