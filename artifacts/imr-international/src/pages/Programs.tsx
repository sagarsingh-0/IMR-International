import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, BookOpen, TrendingUp, ArrowRight, Award } from "lucide-react";

interface Program {
  title: string;
  slug: string;
  duration: string;
  category: string;
  description: string;
  icon: string;
  highlights: string[];
  badge?: string;
}

const PROGRAMS: Program[] = [
  {
    title: "AI & Machine Learning",
    slug: "ai-machine-learning",
    duration: "6 Months",
    category: "Technology Certificate",
    description: "Master predictive models, neural networks, and deep learning using Python, TensorFlow, and PyTorch.",
    icon: "🤖",
    highlights: ["Python & ML Algorithms", "Neural Networks", "NLP & Computer Vision"],
    badge: "Most Popular",
  },
  {
    title: "Data Science with Python-R",
    slug: "data-science-python",
    duration: "4 Months",
    category: "Technology Certificate",
    description: "Comprehensive data wrangling, visualization, and predictive modeling using industry-standard tools.",
    icon: "📊",
    highlights: ["Pandas & NumPy", "Statistical Analysis", "Predictive Modeling"],
    badge: "Trending",
  },
  {
    title: "Business Data Analytics",
    slug: "business-data-analytics",
    duration: "3 Months",
    category: "Technology Certificate",
    description: "Translate raw data into actionable business insights using Tableau, PowerBI, and SQL.",
    icon: "📈",
    highlights: ["Tableau & PowerBI", "SQL for Analysis", "KPI Dashboarding"],
  },
  {
    title: "Ethical Hacking",
    slug: "ethical-hacking",
    duration: "3 Months",
    category: "Technology Certificate",
    description: "Learn penetration testing and vulnerability assessment to secure networks and applications.",
    icon: "🔐",
    highlights: ["Penetration Testing", "Kali Linux", "OWASP Top 10"],
  },
  {
    title: "Blockchain Technology",
    slug: "blockchain-technology",
    duration: "4 Months",
    category: "Technology Certificate",
    description: "Build smart contracts, dApps, and understand cryptographic principles of the decentralized web.",
    icon: "⛓️",
    highlights: ["Ethereum & Solidity", "Smart Contracts", "DeFi Concepts"],
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    duration: "3 Months",
    category: "Management Certificate",
    description: "Master SEO, social media strategies, content marketing, and digital campaign management.",
    icon: "📣",
    highlights: ["SEO & SEM", "Social Media Marketing", "Google Ads & Analytics"],
  },
  {
    title: "Financial Technology",
    slug: "financial-technology",
    duration: "3 Months",
    category: "Management Certificate",
    description: "Explore digital banking, payment gateways, and the intersection of finance and technology.",
    icon: "💳",
    highlights: ["FinTech Ecosystem", "Digital Banking", "Payment Gateways"],
  },
  {
    title: "Project Management",
    slug: "project-management",
    duration: "3 Months",
    category: "Management Certificate",
    description: "Lead projects successfully using Agile, Scrum, and Waterfall methodologies with real tools.",
    icon: "📋",
    highlights: ["Agile & Scrum", "Risk Management", "Jira & Asana"],
  },
  {
    title: "HR Analytics",
    slug: "hr-analytics",
    duration: "3 Months",
    category: "Management Certificate",
    description: "Apply data science to Human Resources for talent acquisition, retention, and performance analytics.",
    icon: "👥",
    highlights: ["Workforce Analytics", "Talent Management", "People Analytics"],
  },
  {
    title: "Supply Chain Analytics",
    slug: "supply-chain-analytics",
    duration: "3 Months",
    category: "Management Certificate",
    description: "Optimize logistics, inventory, and operations using data-driven supply chain strategies.",
    icon: "🚚",
    highlights: ["Logistics Optimization", "Inventory Analytics", "Demand Forecasting"],
  },
  {
    title: "Live Project",
    slug: "live-project",
    duration: "2–3 Months",
    category: "Project & Internship",
    description: "Work on real-time industry projects under corporate mentors to gain practical experience.",
    icon: "💼",
    highlights: ["Real Industry Projects", "Corporate Mentorship", "Portfolio Building"],
  },
  {
    title: "Summer Internship",
    slug: "summer-internship",
    duration: "8 Weeks",
    category: "Project & Internship",
    description: "An immersive 8-week program in top partner companies applying academic knowledge to real problems.",
    icon: "🌟",
    highlights: ["Top Partner Companies", "Real Business Problems", "Certificate of Completion"],
  },
];

const FEATURED = PROGRAMS.slice(0, 5);

const CATEGORIES = ["All", "Technology Certificate", "Management Certificate", "Project & Internship"];

export default function Programs() {
  const [, setLocation] = useLocation();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [autoPlay, setAutoPlay] = useState(true);

  const next = useCallback(() => {
    setCarouselIndex(i => (i + 1) % FEATURED.length);
  }, []);

  const prev = () => setCarouselIndex(i => (i - 1 + FEATURED.length) % FEATURED.length);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [autoPlay, next]);

  const filtered = selectedCategory === "All"
    ? PROGRAMS
    : PROGRAMS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">IMR International</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Digital Certification Programs</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Industry-recognized certifications designed to make you job-ready in today's digital economy.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* FEATURED CAROUSEL */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Featured Programs</h2>
              <p className="text-muted-foreground text-sm mt-1">Our most sought-after certifications</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { prev(); setAutoPlay(false); }}
                className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => { next(); setAutoPlay(false); }}
                className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-gradient-to-br from-primary to-blue-800 rounded-2xl p-8 md:p-12 text-white"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    {FEATURED[carouselIndex].badge && (
                      <span className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                        <Award className="w-3 h-3" />
                        {FEATURED[carouselIndex].badge}
                      </span>
                    )}
                    <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">{FEATURED[carouselIndex].category}</p>
                    <h3 className="text-3xl font-display font-bold mb-4">{FEATURED[carouselIndex].title}</h3>
                    <p className="text-white/80 text-base leading-relaxed mb-6">{FEATURED[carouselIndex].description}</p>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">{FEATURED[carouselIndex].duration}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setLocation(`/certification/${FEATURED[carouselIndex].slug}`)}
                      className="bg-accent hover:bg-yellow-400 text-accent-foreground font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 group"
                    >
                      View Full Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <div className="hidden md:flex flex-col gap-3">
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> What You'll Learn
                    </p>
                    {FEATURED[carouselIndex].highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-accent text-xs font-bold">{i + 1}</span>
                        </div>
                        <span className="text-sm font-medium">{h}</span>
                      </div>
                    ))}
                    <div className="text-5xl mt-4 text-center opacity-60">{FEATURED[carouselIndex].icon}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {FEATURED.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCarouselIndex(i); setAutoPlay(false); }}
                  className={`rounded-full transition-all duration-300 ${i === carouselIndex ? "w-6 h-2.5 bg-primary" : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-primary/50"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ALL PROGRAMS GRID */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">All Certification Programs</h2>
              <p className="text-muted-foreground text-sm mt-1">{filtered.length} programs available</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence>
              {filtered.map((program, idx) => (
                <motion.div
                  key={program.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => setLocation(`/certification/${program.slug}`)}
                  className="group bg-white border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 cursor-pointer relative overflow-hidden"
                >
                  {program.badge && (
                    <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {program.badge}
                    </span>
                  )}
                  <div className="text-3xl mb-4">{program.icon}</div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{program.category}</p>
                  <h3 className="font-display font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{program.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all">
                      <span>Learn more</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-8 text-center text-white">
          <TrendingUp className="w-10 h-10 text-accent mx-auto mb-4" />
          <h3 className="text-2xl font-display font-bold mb-2">Ready to Upskill?</h3>
          <p className="text-white/70 mb-6">Join thousands of students who have transformed their careers with IMR International.</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setLocation("/admission/enquiry")}
              className="bg-accent hover:bg-yellow-400 text-accent-foreground font-bold px-6 py-3 rounded-xl transition-all"
            >
              Apply Now
            </button>
            <button
              onClick={() => setLocation("/admission/process")}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              Learn About Admission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
