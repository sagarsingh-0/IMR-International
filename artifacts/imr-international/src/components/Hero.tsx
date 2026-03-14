import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useLocation } from "wouter";

export function Hero() {
  const [, setLocation] = useLocation();

  return (
    <div className="relative min-h-[600px] flex items-center overflow-hidden bg-primary">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="Abstract tech background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white mb-8"
          >
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium tracking-wide">Admissions Open 2026-27</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6"
          >
            IMR <span className="text-accent">INTERNATIONAL</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed"
          >
            Increase your skills in no time and enhance your career with our Smart Digital Innovation programs.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={() => setLocation('/education/bba')}
              className="px-8 py-4 bg-accent hover:bg-yellow-500 text-accent-foreground rounded-xl font-bold text-lg shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Programs
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={() => setLocation('/admission/enquiry')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm rounded-xl font-bold text-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
            >
              Admission Enquiry
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
