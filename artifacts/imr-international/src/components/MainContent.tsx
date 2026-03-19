import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle2, ChevronRight, Award, Laptop, Users, X } from "lucide-react";
import { useLocation } from "wouter";

const CERTIFICATIONS = [
  { title: "AI & Machine Learning", slug: "ai-machine-learning" },
  { title: "Data Science with Python", slug: "data-science-python" },
  { title: "Business Data Analytics", slug: "business-data-analytics" },
  { title: "Ethical Hacking", slug: "ethical-hacking" },
  { title: "Blockchain Technology", slug: "blockchain-technology" },
  { title: "Digital Marketing", slug: "digital-marketing" },
  { title: "Project Management", slug: "project-management" }
];

const STATS = [
  { icon: Award, label: "Recognized", value: "A+ Grade" },
  { icon: Laptop, label: "Digital Programs", value: "25+" },
  { icon: Users, label: "Alumni Network", value: "10k+" },
];

// ── Replace this with the actual IMR International YouTube video ID ──
// e.g. if the YouTube URL is https://www.youtube.com/watch?v=ABC123XYZ
// then set VIDEO_ID = "ABC123XYZ"
const VIDEO_ID = "u4wCd2G_eTk"; // IMR-style education promo placeholder

export function MainContent() {
  const [, setLocation] = useLocation();
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column: About & Video */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
              <div>
                <h4 className="text-primary font-bold tracking-wider uppercase text-sm mb-2 flex items-center gap-2">
                  <span className="w-8 h-1 bg-accent rounded-full"></span>
                  Welcome to Excellence
                </h4>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-6">
                  Shaping the future through <span className="text-primary">Smart Education</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">IMR INTERNATIONAL</strong> is a premier Educational Technology Organization in Bhubaneswar, Odisha. We are dedicated to providing SMART DIGITAL INNOVATION programs and comprehensive skill development to bridge the gap between academia and industry.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 py-6 border-y border-border/60">
                {STATS.map((stat, i) => (
                  <div key={i} className="flex flex-col items-start">
                    <stat.icon className="w-8 h-8 text-accent mb-3" />
                    <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                    <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Video Thumbnail — click to open modal */}
              <button
                onClick={() => setVideoOpen(true)}
                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl border border-border/50 bg-card w-full text-left"
                aria-label="Play IMR International video"
              >
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop"
                  alt="Students collaborating at IMR International"
                  className="w-full h-[280px] object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/15 transition-colors duration-300" />

                {/* Animated ring + play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Outer pulse ring */}
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping scale-150 opacity-60" />
                    {/* Middle ring */}
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:bg-yellow-400 transition-colors">
                        <Play className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white font-bold text-lg">▶ Watch IMR International Video</p>
                  <p className="text-white/60 text-sm mt-0.5">Click to play — About our programs & campus</p>
                </div>
              </button>
            </div>

            {/* Right Column: Certifications */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-2xl shadow-primary/5 border border-border"
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>

                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  Digital Certification
                </h3>
                <p className="text-sm text-muted-foreground mb-8">
                  Industry-recognized programs designed for the modern workforce.
                </p>

                <div className="space-y-4">
                  {CERTIFICATIONS.map((cert, idx) => (
                    <motion.div
                      key={idx}
                      onClick={() => setLocation(`/certification/${cert.slug}`)}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group flex items-center p-4 rounded-xl hover:bg-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20 bg-muted/30"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-5 h-5 text-primary group-hover:text-accent" />
                      </div>
                      <span className="ml-4 font-semibold text-foreground group-hover:text-white transition-colors">
                        {cert.title}
                      </span>
                      <ChevronRight className="ml-auto w-5 h-5 text-muted-foreground group-hover:text-white/70 transition-transform group-hover:translate-x-1" />
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={() => setLocation('/programs')}
                  className="w-full mt-8 py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  View All Programs
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Video Modal ── */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center text-white transition-all border border-white/20 hover:border-white/50"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-blue-700 px-6 py-3 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Play className="w-3.5 h-3.5 text-slate-900 ml-0.5" fill="currentColor" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">IMR International — Institution Overview</p>
                  <p className="text-white/60 text-xs">Smart · Digital · Innovation</p>
                </div>
              </div>

              {/* YouTube embed */}
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="IMR International Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Footer */}
              <div className="bg-slate-900 px-6 py-3 flex items-center justify-between">
                <p className="text-white/50 text-xs">IMR International, Bhubaneswar, Odisha</p>
                <button
                  onClick={() => setVideoOpen(false)}
                  className="text-white/50 hover:text-white text-xs transition-colors"
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
