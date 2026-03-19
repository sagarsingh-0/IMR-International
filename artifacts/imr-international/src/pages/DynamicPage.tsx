import { useState, useEffect, useCallback } from "react";
import { useParams, useLocation } from "wouter";
import { TopBar } from "@/components/TopBar";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PAGE_DATA, type PageContent, type PageTestimonial } from "@/data/programs";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Clock, GraduationCap, ChevronRight, Briefcase,
  Quote, ChevronLeft, Star, Target, Eye, ArrowRight,
  Users, BookOpen, Award, TrendingUp, Zap, Phone, Mail, MapPin
} from "lucide-react";

// Palette for cycling value cards
const CARD_THEMES = [
  { border: "border-t-blue-500",   bg: "bg-blue-50",   icon: "bg-blue-100 text-blue-600",   badge: "bg-blue-500" },
  { border: "border-t-amber-500",  bg: "bg-amber-50",  icon: "bg-amber-100 text-amber-600",  badge: "bg-amber-500" },
  { border: "border-t-emerald-500",bg: "bg-emerald-50",icon: "bg-emerald-100 text-emerald-600", badge: "bg-emerald-500" },
  { border: "border-t-violet-500", bg: "bg-violet-50", icon: "bg-violet-100 text-violet-600", badge: "bg-violet-500" },
  { border: "border-t-rose-500",   bg: "bg-rose-50",   icon: "bg-rose-100 text-rose-600",   badge: "bg-rose-500" },
  { border: "border-t-cyan-500",   bg: "bg-cyan-50",   icon: "bg-cyan-100 text-cyan-600",   badge: "bg-cyan-500" },
];

// Stat card accent colors
const STAT_THEMES = [
  { bg: "bg-blue-600",    light: "bg-blue-50",   text: "text-blue-700"   },
  { bg: "bg-amber-500",   light: "bg-amber-50",  text: "text-amber-700"  },
  { bg: "bg-emerald-600", light: "bg-emerald-50",text: "text-emerald-700"},
  { bg: "bg-violet-600",  light: "bg-violet-50", text: "text-violet-700" },
];

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar({ stats }: { stats: PageContent["stats"] }) {
  if (!stats?.length) return null;
  return (
    <div className="mb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const theme = STAT_THEMES[i % STAT_THEMES.length];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${theme.light} rounded-2xl p-5 text-center border border-white shadow-sm relative overflow-hidden`}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 ${theme.bg} rounded-t-2xl`} />
              <div className="text-3xl mb-2 mt-1">{s.icon}</div>
              <div className={`text-2xl md:text-3xl font-display font-extrabold ${theme.text}`}>{s.value}</div>
              <div className="text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wide">{s.label}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Vision + Mission Cards ───────────────────────────────────────────────────
function MissionVisionCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e3a5f] via-[#1a4f8a] to-[#2563eb] text-white p-8 shadow-xl shadow-blue-900/20"
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5 border border-white/10" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-blue-400/10" />
        <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-5 border border-white/20">
          <Eye className="w-7 h-7 text-white" />
        </div>
        <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
          <Star className="w-3 h-3 text-amber-400" /> Our Vision
        </div>
        <h3 className="text-2xl font-display font-bold mb-3">Globally Recognized Excellence</h3>
        <p className="text-white/85 text-sm leading-relaxed">
          To be a globally recognized center of excellence in modern education — where innovation, ethics, and industry readiness converge to shape the leaders of tomorrow.
        </p>
        <div className="mt-5 pt-5 border-t border-white/15 grid grid-cols-2 gap-2.5">
          {["Global Recognition", "Center of Excellence", "Innovation-Led", "Future-Ready"].map((tag, i) => (
            <div key={i} className="flex items-center gap-2 text-white/75 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              {tag}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 p-8 shadow-xl shadow-amber-500/20"
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 border border-white/20" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-orange-300/20" />
        <div className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center mb-5 border border-white/30">
          <Target className="w-7 h-7 text-slate-800" />
        </div>
        <div className="inline-flex items-center gap-1.5 bg-black/10 border border-black/10 text-slate-800 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
          <Award className="w-3 h-3" /> Our Mission
        </div>
        <h3 className="text-2xl font-display font-bold mb-3 text-slate-800">Empowering Digital Leaders</h3>
        <p className="text-slate-800/85 text-sm leading-relaxed">
          To empower individuals with cutting-edge knowledge, ethical values, and leadership skills necessary to thrive in a digital economy — through industry-relevant, technology-driven education.
        </p>
        <div className="mt-5 pt-5 border-t border-black/10 grid grid-cols-2 gap-2.5">
          {["Cutting-Edge Knowledge", "Ethical Values", "Leadership Skills", "Digital Economy"].map((tag, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-700 text-xs">
              <CheckCircle2 className="w-3 h-3 text-slate-700 flex-shrink-0" />
              {tag}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Values Section ──────────────────────────────────────────────────────────
function ValuesSection({ values, title = "Core Values" }: { values: PageContent["values"]; title?: string }) {
  if (!values?.length) return null;
  const [active, setActive] = useState(0);
  const next = useCallback(() => setActive(i => (i + 1) % values.length), [values.length]);
  const prev = () => setActive(i => (i - 1 + values.length) % values.length);

  useEffect(() => {
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="mb-12 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 border border-slate-200/60 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-blue-500 to-violet-500" />
        <h3 className="text-2xl font-display font-bold text-foreground">{title}</h3>
      </div>

      {/* Mobile carousel */}
      <div className="sm:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className={`${CARD_THEMES[active % CARD_THEMES.length].bg} border-t-4 ${CARD_THEMES[active % CARD_THEMES.length].border} rounded-2xl p-6 shadow-sm`}
          >
            <div className="text-4xl mb-3">{values[active].icon}</div>
            <h4 className="font-bold text-foreground text-lg mb-2">{values[active].title}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{values[active].desc}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between mt-4 items-center">
          <button onClick={prev} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5">
            {values.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`rounded-full transition-all ${i === active ? "w-5 h-2.5 bg-primary" : "w-2.5 h-2.5 bg-muted-foreground/25"}`} />
            ))}
          </div>
          <button onClick={next} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4">
        {values.map((v, i) => {
          const theme = CARD_THEMES[i % CARD_THEMES.length];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`group border-t-4 ${theme.border} bg-white rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-sm`}
            >
              <div className={`w-11 h-11 rounded-xl ${theme.icon} flex items-center justify-center mb-3 text-xl font-bold`}>
                {v.icon}
              </div>
              <h4 className="font-bold text-foreground mb-2 text-sm">{v.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Image + Text Sections ────────────────────────────────────────────────────
const SECTION_BG = [
  "bg-white",
  "bg-gradient-to-br from-amber-50/60 to-orange-50/40 border border-amber-100/60",
  "bg-gradient-to-br from-emerald-50/60 to-teal-50/40 border border-emerald-100/60",
  "bg-gradient-to-br from-violet-50/60 to-indigo-50/40 border border-violet-100/60",
];

function ImageTextSection({ section, index }: { section: NonNullable<PageContent["sections"]>[0]; index: number }) {
  const isReverse = section.type === "text-image";
  const isFullWidth = section.type === "full-width";
  const bgClass = SECTION_BG[index % SECTION_BG.length];

  const FULL_BG_GRADIENTS = [
    "from-blue-600 to-indigo-700",
    "from-emerald-600 to-teal-700",
    "from-violet-600 to-purple-700",
  ];

  if (isFullWidth) {
    const grad = FULL_BG_GRADIENTS[index % FULL_BG_GRADIENTS.length];
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1 }}
        className={`mb-12 bg-gradient-to-r ${grad} rounded-2xl p-8 text-white shadow-lg`}
      >
        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white/80 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
          <Zap className="w-3 h-3 text-yellow-300" /> Insight
        </div>
        <h3 className="text-2xl font-display font-bold mb-3">{section.title}</h3>
        <p className="text-white/85 leading-relaxed">{section.content}</p>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className={`mb-12 rounded-2xl overflow-hidden ${bgClass === "bg-white" ? "border border-border/40 shadow-sm" : ""}`}
    >
      <div className={`${bgClass} p-6 md:p-8`}>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${isReverse ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""}`}>
          {section.image && (
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-video md:aspect-[4/3]">
              <img src={section.image} alt={section.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
          )}
          <div>
            <div className="w-10 h-1 rounded-full bg-primary mb-4" />
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">{section.title}</h3>
            <div className="space-y-3">
              {section.content.split("\n\n").map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed text-sm">{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// ─── Testimonials Carousel ─────────────────────────────────────────────────────
const TESTIMONIAL_GRADIENTS = [
  "from-[#1e3a5f] to-[#1a4f8a]",
  "from-violet-800 to-indigo-800",
  "from-emerald-700 to-teal-800",
];

function TestimonialsSection({ testimonials }: { testimonials: PageTestimonial[] }) {
  const [active, setActive] = useState(0);
  const next = useCallback(() => setActive(i => (i + 1) % testimonials.length), [testimonials.length]);
  const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const grad = TESTIMONIAL_GRADIENTS[active % TESTIMONIAL_GRADIENTS.length];

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-violet-500 to-rose-500" />
        <h3 className="text-2xl font-display font-bold text-foreground">What People Say</h3>
      </div>
      <div className={`relative bg-gradient-to-br ${grad} rounded-2xl p-8 text-white overflow-hidden shadow-xl`}>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 border border-white/10" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            <Quote className="w-9 h-9 text-amber-400 mb-4 opacity-80" />
            <p className="text-white/90 text-lg leading-relaxed mb-6 italic">
              "{testimonials[active].text}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-lg">
                {testimonials[active].avatar}
              </div>
              <div>
                <p className="font-bold text-white">{testimonials[active].name}</p>
                <p className="text-white/55 text-sm">{testimonials[active].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/15">
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${i === active ? "w-7 h-2.5 bg-amber-400" : "w-2.5 h-2.5 bg-white/25 hover:bg-white/50"}`} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/15">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/15">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Team Grid ────────────────────────────────────────────────────────────────
function TeamGrid({ team }: { team: PageContent["team"] }) {
  if (!team?.length) return null;
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500" />
        <h3 className="text-2xl font-display font-bold text-foreground">Our Team</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {team.map((member, i) => {
          const theme = CARD_THEMES[i % CARD_THEMES.length];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`group border-t-4 ${theme.border} bg-white rounded-2xl p-5 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-sm`}
            >
              {member.img ? (
                <img src={member.img} alt={member.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-slate-200 group-hover:border-primary/60 transition-all shadow-md" loading="lazy" />
              ) : (
                <div className={`w-16 h-16 rounded-full ${theme.icon} flex items-center justify-center mx-auto mb-3 text-lg font-bold`}>
                  {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
              )}
              <h4 className="font-bold text-foreground text-sm leading-tight">{member.name}</h4>
              <p className="text-primary text-xs font-semibold mt-1">{member.role}</p>
              <p className="text-muted-foreground text-[11px] mt-1.5 leading-tight">{member.qual}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Topics Grid ──────────────────────────────────────────────────────────────
const TOPIC_COLORS = [
  "bg-blue-500", "bg-amber-500", "bg-emerald-500", "bg-violet-500",
  "bg-rose-500", "bg-cyan-500", "bg-orange-500", "bg-indigo-500",
  "bg-teal-500", "bg-pink-500", "bg-lime-500", "bg-sky-500",
];

function TopicsGrid({ topics }: { topics: string[] }) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500" />
        <h3 className="text-2xl font-display font-bold text-foreground">Curriculum & Topics</h3>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {topics.map((topic, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-border/50 hover:border-primary/25 hover:shadow-sm transition-all group"
          >
            <div className={`w-7 h-7 rounded-lg ${TOPIC_COLORS[i % TOPIC_COLORS.length]} flex items-center justify-center flex-shrink-0 shadow-sm`}>
              <span className="text-white text-xs font-bold">{i + 1}</span>
            </div>
            <span className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{topic}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Highlights ───────────────────────────────────────────────────────────────
const HIGHLIGHT_ACCENTS = [
  "border-l-blue-500 bg-blue-50/50",
  "border-l-emerald-500 bg-emerald-50/50",
  "border-l-violet-500 bg-violet-50/50",
  "border-l-amber-500 bg-amber-50/50",
  "border-l-rose-500 bg-rose-50/50",
  "border-l-cyan-500 bg-cyan-50/50",
];

function HighlightsList({ highlights, title = "Key Highlights" }: { highlights: string[]; title?: string }) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-amber-500 to-orange-500" />
        <h3 className="text-2xl font-display font-bold text-foreground">{title}</h3>
      </div>
      <div className="space-y-2.5">
        {highlights.map((h, i) => {
          const accent = HIGHLIGHT_ACCENTS[i % HIGHLIGHT_ACCENTS.length];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-start gap-3 p-4 rounded-xl border-l-4 ${accent} shadow-sm`}
            >
              <CheckCircle2 className="w-4.5 h-4.5 text-green-500 shrink-0 mt-0.5 flex-shrink-0" />
              <span className="text-foreground/85 leading-relaxed text-sm">{h}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Overview section ─────────────────────────────────────────────────────────
function OverviewSection({ content }: { content: string }) {
  const paragraphs = content.split("\n\n");
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-primary to-blue-400" />
        <h2 className="text-2xl font-display font-bold text-foreground">Overview</h2>
      </div>
      <div className="bg-white rounded-2xl border border-border/40 p-6 shadow-sm">
        <div className="space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className={`leading-relaxed ${i === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main DynamicPage ─────────────────────────────────────────────────────────
export default function DynamicPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const category = params.category || "";
  const slug = params.slug || "";
  const pageContent = PAGE_DATA[category]?.[slug];

  if (!pageContent) {
    return (
      <div className="min-h-screen flex flex-col font-sans">
        <TopBar />
        <Navigation />
        <main className="flex-grow flex items-center justify-center bg-muted/30">
          <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-border">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-3xl font-display font-bold text-primary mb-3">Page Not Found</h2>
            <p className="text-muted-foreground mb-6 text-sm">The page you're looking for doesn't exist yet.</p>
            <button onClick={() => setLocation("/")} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors">
              Return Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isMissionVision = pageContent.pageType === "mission-vision";
  const isLeadership = pageContent.pageType === "leadership";

  // Hero gradient per category
  const HERO_GRADIENTS: Record<string, string> = {
    about:       "from-[#1e3a5f] via-[#1a4f8a] to-[#1e3a8f]",
    education:   "from-emerald-900 via-emerald-800 to-teal-800",
    certification:"from-violet-900 via-violet-800 to-indigo-800",
    focus:       "from-cyan-900 via-cyan-800 to-blue-800",
    insights:    "from-rose-900 via-rose-800 to-pink-800",
    admission:   "from-amber-800 via-amber-700 to-orange-700",
  };
  const heroGrad = HERO_GRADIENTS[category] || "from-[#1e3a5f] via-[#1a4f8a] to-[#1e3a8f]";

  // Badge color per category
  const BADGE_COLORS: Record<string, string> = {
    about:       "bg-blue-500/20 border-blue-400/30 text-blue-200",
    education:   "bg-emerald-500/20 border-emerald-400/30 text-emerald-200",
    certification:"bg-violet-500/20 border-violet-400/30 text-violet-200",
    focus:       "bg-cyan-500/20 border-cyan-400/30 text-cyan-200",
    insights:    "bg-rose-500/20 border-rose-400/30 text-rose-200",
    admission:   "bg-amber-500/20 border-amber-400/30 text-amber-200",
  };
  const badgeColor = BADGE_COLORS[category] || "bg-white/10 border-white/20 text-white/80";

  const PAGE_BADGE: Record<string, { label: string; icon: React.ReactNode }> = {
    "certification": { label: "Certificate Program",  icon: <Award className="w-3 h-3" /> },
    "program":       { label: "Degree Program",       icon: <GraduationCap className="w-3 h-3" /> },
    "mission-vision":{ label: "About Us",             icon: <Target className="w-3 h-3" /> },
    "about":         { label: "About Us",             icon: <BookOpen className="w-3 h-3" /> },
    "focus":         { label: "Focus Center",         icon: <Zap className="w-3 h-3" /> },
    "admission":     { label: "Admissions",           icon: <TrendingUp className="w-3 h-3" /> },
    "leadership":    { label: "Leadership",           icon: <Users className="w-3 h-3" /> },
    "default":       { label: "IMR International",   icon: <Star className="w-3 h-3" /> },
  };
  const badge = PAGE_BADGE[pageContent.pageType || "default"] || PAGE_BADGE.default;

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      <TopBar />
      <Navigation />

      <main className="flex-grow">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div className={`relative min-h-[300px] sm:min-h-[360px] flex items-end overflow-hidden bg-gradient-to-br ${heroGrad} pb-12`}>
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=50" alt="" className="w-full h-full object-cover opacity-10" />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent`} />
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/4 border border-white/8 -translate-y-1/3 translate-x-1/3 hidden md:block" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/3 -translate-y-1/2 -translate-x-1/3 hidden md:block" />
          <div className="absolute bottom-8 right-12 w-20 h-20 rounded-2xl bg-white/5 border border-white/10 hidden lg:block rotate-12" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-white">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-white/50 mb-5 uppercase tracking-widest flex-wrap">
              <span className="hover:text-white cursor-pointer transition-colors" onClick={() => setLocation("/")}>Home</span>
              <ChevronRight className="w-3 h-3" />
              <span className="capitalize text-white/60">{category.replace(/-/g, " ")}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-amber-300">{pageContent.title}</span>
            </div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <span className={`inline-flex items-center gap-1.5 border text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider ${badgeColor}`}>
                {badge.icon} {badge.label}
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-3 drop-shadow-sm">
                {pageContent.title}
              </h1>
              {pageContent.subtitle && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                  className="text-base text-white/70 max-w-2xl">
                  {pageContent.subtitle}
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────────────────── */}
        <div className="bg-slate-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Stats */}
            {pageContent.stats && <StatsBar stats={pageContent.stats} />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* ── Main Content ───────────────────────────────── */}
              <div className="lg:col-span-2">
                {/* Overview */}
                <OverviewSection content={pageContent.overview} />

                {/* Mission-Vision twin cards */}
                {isMissionVision && <MissionVisionCards />}

                {/* Image + text sections */}
                {pageContent.sections?.map((s, i) => (
                  <ImageTextSection key={i} section={s} index={i} />
                ))}

                {/* Curriculum */}
                {pageContent.topics && pageContent.topics.length > 0 && (
                  <TopicsGrid topics={pageContent.topics} />
                )}

                {/* Highlights */}
                {pageContent.highlights && pageContent.highlights.length > 0 && (
                  <HighlightsList
                    highlights={pageContent.highlights}
                    title={isMissionVision ? "Strategic Goals & Objectives" : "Key Highlights"}
                  />
                )}

                {/* Values */}
                {pageContent.values && pageContent.values.length > 0 && (
                  <ValuesSection
                    values={pageContent.values}
                    title={
                      isMissionVision ? "Our Core Values"
                      : isLeadership ? "Leadership Pillars"
                      : pageContent.pageType === "admission" ? "Our Commitments"
                      : pageContent.pageType === "focus" ? "Our Approach"
                      : "Our Pillars"
                    }
                  />
                )}

                {/* Team */}
                {pageContent.team && pageContent.team.length > 0 && (
                  <TeamGrid team={pageContent.team} />
                )}

                {/* Testimonials */}
                {pageContent.testimonials && pageContent.testimonials.length > 0 && (
                  <TestimonialsSection testimonials={pageContent.testimonials} />
                )}

                {/* CTA Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-2xl overflow-hidden shadow-xl"
                >
                  <div className={`bg-gradient-to-r ${heroGrad} p-8 text-white text-center relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white,transparent_60%)]" />
                    <TrendingUp className="w-10 h-10 text-amber-400 mx-auto mb-3 relative z-10" />
                    <h3 className="text-xl font-display font-bold mb-2 relative z-10">Ready to Take the Next Step?</h3>
                    <p className="text-white/70 mb-6 text-sm relative z-10">Join thousands of students who have transformed their careers with IMR International.</p>
                    <div className="flex gap-3 justify-center flex-wrap relative z-10">
                      <button onClick={() => setLocation("/admission/enquiry")} className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-6 py-2.5 rounded-xl transition-all text-sm shadow-lg">
                        Apply Now
                      </button>
                      <button onClick={() => setLocation("/programs")} className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm border border-white/20">
                        View All Programs <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* ── Sidebar ────────────────────────────────────── */}
              <div className="space-y-5">
                {/* Quick Info Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-border/40 overflow-hidden sticky top-28">
                  <div className={`bg-gradient-to-r ${heroGrad} px-6 py-4`}>
                    <h3 className="text-white font-display font-bold text-sm uppercase tracking-wide">Quick Information</h3>
                  </div>
                  <div className="p-5 space-y-3">
                    {pageContent.duration && (
                      <div className="flex gap-3 items-center p-3 rounded-xl bg-blue-50 border border-blue-100">
                        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                          <Clock className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wide">Duration</p>
                          <p className="font-bold text-foreground text-sm">{pageContent.duration}</p>
                        </div>
                      </div>
                    )}
                    {pageContent.eligibility && (
                      <div className="flex gap-3 items-center p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                        <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white flex-shrink-0">
                          <GraduationCap className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wide">Eligibility</p>
                          <p className="font-bold text-foreground text-sm">{pageContent.eligibility}</p>
                        </div>
                      </div>
                    )}
                    {pageContent.career && (
                      <div className="flex gap-3 items-start p-3 rounded-xl bg-violet-50 border border-violet-100">
                        <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                          <Briefcase className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-violet-600 font-bold uppercase tracking-wide mb-1">Career Roles</p>
                          <p className="font-semibold text-foreground text-xs leading-relaxed">{pageContent.career}</p>
                        </div>
                      </div>
                    )}
                    <div className="pt-2 space-y-2.5">
                      <button onClick={() => setLocation("/admission/enquiry")} className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5">
                        Apply Now
                      </button>
                      <button onClick={() => setLocation("/admission/process")} className="w-full py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-bold transition-all text-sm">
                        Admission Process
                      </button>
                      <button onClick={() => setLocation("/admission/scholarship")} className="w-full py-3 bg-amber-50 border border-amber-300 text-amber-700 hover:bg-amber-100 rounded-xl font-bold transition-all text-sm">
                        🎓 Scholarships
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-white rounded-2xl border border-border/40 p-5 shadow-sm">
                  <h4 className="font-bold text-foreground mb-4 text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Phone className="w-2.5 h-2.5 text-white" />
                    </span>
                    Contact Admissions
                  </h4>
                  <div className="space-y-3">
                    <a href="tel:+919938080165" className="flex items-center gap-3 p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group">
                      <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-blue-700 font-semibold text-sm group-hover:text-blue-800">+91-9938080165</span>
                    </a>
                    <a href="mailto:imrinternational11@gmail.com" className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors group">
                      <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-emerald-700 font-medium text-xs group-hover:text-emerald-800 break-all">imrinternational11@gmail.com</span>
                    </a>
                    <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50">
                      <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-xs leading-relaxed">07 District Centre, CS Pur, Bhubaneswar, Odisha</span>
                    </div>
                  </div>
                </div>

                {/* Related Programs */}
                <div className="bg-white rounded-2xl border border-border/40 p-5 shadow-sm">
                  <h4 className="font-bold text-foreground mb-3 text-sm">Popular Programs</h4>
                  <div className="space-y-1.5">
                    {[
                      { label: "AI & Machine Learning", slug: "certification/ai-machine-learning", color: "bg-violet-500" },
                      { label: "Data Science with Python",slug: "certification/data-science-python",color: "bg-blue-500" },
                      { label: "BBA Program",            slug: "education/bba",                   color: "bg-emerald-500" },
                      { label: "Digital Marketing",      slug: "certification/digital-marketing", color: "bg-amber-500" },
                    ].map((p) => (
                      <button key={p.slug} onClick={() => setLocation(`/${p.slug}`)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-left transition-all group border border-transparent hover:border-border/50">
                        <span className={`w-2 h-2 rounded-full ${p.color} flex-shrink-0`} />
                        <span className="text-muted-foreground group-hover:text-primary text-sm transition-colors flex-1">{p.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
