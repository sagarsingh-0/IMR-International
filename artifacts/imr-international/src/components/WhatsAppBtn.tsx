import { MessageCircle } from "lucide-react";

export function WhatsAppBtn() {
  return (
    <a 
      href="#" 
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 hover:scale-110 hover:-translate-y-2 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
      <MessageCircle className="w-8 h-8 fill-current" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl">
        Chat with us!
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-slate-900"></div>
      </div>
    </a>
  );
}
