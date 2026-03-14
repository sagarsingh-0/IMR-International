import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

export function Hero() {
  return (
    <div className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
          alt="IMR Campus Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Subtle mesh pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 font-medium text-sm mb-6"
          >
            <BookOpen className="w-4 h-4 text-accent" />
            <span>Admissions Open 2026-27</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
          >
            IMR <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-300">INTERNATIONAL</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-blue-50 font-medium max-w-2xl mb-10 leading-relaxed drop-shadow"
          >
            Increase your skills in no time and enhance your career with our Smart Digital Innovation programs.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="px-8 py-4 bg-accent hover:bg-yellow-400 text-accent-foreground rounded-xl font-bold text-lg shadow-xl shadow-accent/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
              Explore Programs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl font-bold text-lg hover:-translate-y-1 transition-all duration-300">
              Download Brochure
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
