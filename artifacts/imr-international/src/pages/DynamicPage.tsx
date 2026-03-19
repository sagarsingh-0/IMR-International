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
  Users, BookOpen, Award, TrendingUp, Zap
} from "lucide-react";

// ─── Stat Bar ────────────────────────────────────────────────────────────────
function StatsBar({ stats }: { stats: PageContent["stats"] }) {
  if (!stats?.length) return null;
  return (
    <div className="bg-primary/5 border-y border-primary/10 py-8 mb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl mb-1">{s.icon}</div>
            <div className="text-2xl md:text-3xl font-display font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground font-medium mt-1 uppercase tracking-wide">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Vision + Mission Cards ────────────────────────────────────────────────
function MissionVisionCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-blue-700 text-white p-8"
      >
        <div className="absolute top-4 right-4 opacity-10">
          <Eye className="w-24 h-24" />
        </div>
        <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
          <Eye className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-display font-bold mb-3 text-accent">Our Vision</h3>
        <p className="text-white/90 text-base leading-relaxed">
          To be a globally recognized center of excellence in modern education — where innovation, ethics, and industry readiness converge to shape the leaders of tomorrow.
        </p>
        <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-3">
          {["Global Recognition", "Center of Excellence", "Innovation-Led", "Future-Ready"].map((tag, i) => (
            <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
              <Star className="w-3 h-3 text-accent flex-shrink-0" />
              {tag}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-yellow-400 p-8"
      >
        <div className="absolute top-4 right-4 opacity-10">
          <Target className="w-24 h-24" />
        </div>
        <div className="w-14 h-14 rounded-2xl bg-black/10 flex items-center justify-center mb-5">
          <Target className="w-7 h-7 text-slate-800" />
        </div>
        <h3 className="text-xl font-display font-bold mb-3 text-slate-800">Our Mission</h3>
        <p className="text-slate-800/90 text-base leading-relaxed">
          To empower individuals with cutting-edge knowledge, ethical values, and leadership skills necessary to thrive in a digital economy — through industry-relevant, technology-driven education.
        </p>
        <div className="mt-6 pt-6 border-t border-black/10 grid grid-cols-2 gap-3">
          {["Cutting-Edge Knowledge", "Ethical Values", "Leadership Skills", "Digital Economy"].map((tag, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-700 text-sm">
              <CheckCircle2 className="w-3 h-3 text-slate-700 flex-shrink-0" />
              {tag}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Values Carousel ──────────────────────────────────────────────────────
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
    <section className="mb-12">
      <h3 className="text-2xl font-display font-bold text-foreground mb-6">{title}</h3>

      {/* Carousel for mobile */}
      <div className="sm:hidden">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-border rounded-2xl p-6 shadow-sm"
            >
              <div className="text-4xl mb-4">{values[active].icon}</div>
              <h4 className="font-bold text-foreground text-lg mb-2">{values[active].title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{values[active].desc}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-4">
            <button onClick={prev} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5 items-center">
              {values.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`rounded-full transition-all ${i === active ? "w-4 h-2 bg-primary" : "w-2 h-2 bg-muted-foreground/30"}`} />
              ))}
            </div>
            <button onClick={next} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid for desktop */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4">
        {values.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group bg-white border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/8 transition-all duration-300"
          >
            <div className="text-3xl mb-3">{v.icon}</div>
            <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{v.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Image + Text Section ──────────────────────────────────────────────────
function ImageTextSection({ section, index }: { section: NonNullable<PageContent["sections"]>[0]; index: number }) {
  const isReverse = section.type === "text-image";
  const isFullWidth = section.type === "full-width";

  if (isFullWidth) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1 }}
        className="mb-12 bg-gradient-to-br from-primary/5 to-blue-50 border border-primary/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-display font-bold text-foreground mb-4">{section.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-base">{section.content}</p>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className={`mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${isReverse ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""}`}
    >
      {section.image && (
        <div className="rounded-2xl overflow-hidden shadow-xl shadow-primary/10 aspect-video md:aspect-square">
          <img
            src={section.image}
            alt={section.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div>
        <h3 className="text-2xl font-display font-bold text-foreground mb-4">{section.title}</h3>
        <div className="space-y-4">
          {section.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed">{para}</p>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ─── Testimonials Carousel ─────────────────────────────────────────────────
function TestimonialsSection({ testimonials }: { testimonials: PageTestimonial[] }) {
  const [active, setActive] = useState(0);
  const next = useCallback(() => setActive(i => (i + 1) % testimonials.length), [testimonials.length]);
  const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="mb-12">
      <h3 className="text-2xl font-display font-bold text-foreground mb-6">What People Say</h3>
      <div className="relative bg-gradient-to-br from-primary to-blue-800 rounded-2xl p-8 text-white overflow-hidden">
        <div className="absolute top-4 left-4 opacity-10">
          <Quote className="w-20 h-20" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            <Quote className="w-8 h-8 text-accent mb-4" />
            <p className="text-white/90 text-lg leading-relaxed mb-6 italic">
              "{testimonials[active].text}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                {testimonials[active].avatar}
              </div>
              <div>
                <p className="font-bold text-white">{testimonials[active].name}</p>
                <p className="text-white/60 text-sm">{testimonials[active].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/20">
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`rounded-full transition-all ${i === active ? "w-6 h-2.5 bg-accent" : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"}`} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Team Grid ─────────────────────────────────────────────────────────────
function TeamGrid({ team }: { team: PageContent["team"] }) {
  if (!team?.length) return null;
  return (
    <section className="mb-12">
      <h3 className="text-2xl font-display font-bold text-foreground mb-6">Our Team</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {team.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group bg-white border border-border rounded-2xl p-5 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300"
          >
            {member.img ? (
              <img
                src={member.img}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-primary/20 group-hover:border-primary/60 transition-all"
                loading="lazy"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Users className="w-7 h-7 text-primary" />
              </div>
            )}
            <h4 className="font-bold text-foreground text-sm leading-tight">{member.name}</h4>
            <p className="text-primary text-xs font-semibold mt-1">{member.role}</p>
            <p className="text-muted-foreground text-xs mt-1.5 leading-tight">{member.qual}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Topics Grid ─────────────────────────────────────────────────────────────
function TopicsGrid({ topics }: { topics: string[] }) {
  return (
    <section className="mb-12">
      <h3 className="text-2xl font-display font-bold text-foreground mb-6">Curriculum & Topics Covered</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {topics.map((topic, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/20 hover:bg-primary/3 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary text-xs font-bold">{i + 1}</span>
            </div>
            <span className="font-medium text-foreground text-sm">{topic}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Highlights List ──────────────────────────────────────────────────────
function HighlightsList({ highlights, title = "Key Highlights" }: { highlights: string[]; title?: string }) {
  return (
    <section className="mb-12">
      <h3 className="text-2xl font-display font-bold text-foreground mb-6">{title}</h3>
      <div className="space-y-3">
        {highlights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-white hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <span className="text-muted-foreground leading-relaxed">{h}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Main Dynamic Page ────────────────────────────────────────────────────
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
          <div className="text-center p-8 bg-card rounded-2xl shadow-xl border border-border">
            <h2 className="text-4xl font-display font-bold text-primary mb-4">404 — Not Found</h2>
            <p className="text-muted-foreground mb-8">The page you are looking for does not exist.</p>
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
  const hasTeam = pageContent.team && pageContent.team.length > 0;

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      <TopBar />
      <Navigation />

      <main className="flex-grow">
        {/* ── Hero Banner ────────────────────────────────────── */}
        <div className="relative min-h-[280px] sm:min-h-[340px] flex items-end overflow-hidden bg-primary pb-10">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=60"
              alt="Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/50" />
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 border border-white/10" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-accent/10 border border-accent/20" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-white">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-5 uppercase tracking-wider">
              <span className="hover:text-white cursor-pointer" onClick={() => setLocation("/")}> Home </span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="capitalize">{category.replace("-", " ")}</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-accent">{pageContent.title}</span>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Page type badge */}
              <span className="inline-flex items-center gap-1.5 bg-accent/20 text-accent border border-accent/30 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                {pageContent.pageType === "certification" && <><Award className="w-3 h-3" /> Certificate Program</>}
                {pageContent.pageType === "program" && <><GraduationCap className="w-3 h-3" /> Degree Program</>}
                {pageContent.pageType === "mission-vision" && <><Target className="w-3 h-3" /> About Us</>}
                {pageContent.pageType === "about" && <><BookOpen className="w-3 h-3" /> About Us</>}
                {pageContent.pageType === "focus" && <><Zap className="w-3 h-3" /> Focus Center</>}
                {pageContent.pageType === "admission" && <><TrendingUp className="w-3 h-3" /> Admissions</>}
                {pageContent.pageType === "leadership" && <><Users className="w-3 h-3" /> Leadership</>}
                {!pageContent.pageType && <><Star className="w-3 h-3" /> IMR International</>}
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-3">
                {pageContent.title}
              </h1>
              {pageContent.subtitle && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-lg text-slate-200 max-w-2xl">
                  {pageContent.subtitle}
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>

        {/* ── Main Content Area ────────────────────────────────────── */}
        <div className="bg-slate-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Stats Bar */}
            {pageContent.stats && (
              <StatsBar stats={pageContent.stats} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* ── Left / Main Content ────────────────────────────── */}
              <div className="lg:col-span-2">

                {/* Overview */}
                <section className="mb-10">
                  <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-primary rounded-full inline-block" />
                    Overview
                  </h2>
                  <div className="prose max-w-none text-muted-foreground leading-relaxed text-base space-y-4">
                    {pageContent.overview.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>

                {/* Mission-Vision specific cards */}
                {isMissionVision && <MissionVisionCards />}

                {/* Sections (image + text) */}
                {pageContent.sections?.map((section, i) => (
                  <ImageTextSection key={i} section={section} index={i} />
                ))}

                {/* Topics/Curriculum */}
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

                {/* Core Values / Pillars */}
                {pageContent.values && pageContent.values.length > 0 && (
                  <ValuesSection
                    values={pageContent.values}
                    title={
                      isMissionVision ? "Our Core Values"
                      : isLeadership ? "Leadership Pillars"
                      : pageContent.pageType === "admission" ? "Admission Pillars"
                      : pageContent.pageType === "focus" ? "Our Approach"
                      : "Our Pillars"
                    }
                  />
                )}

                {/* Team */}
                {hasTeam && <TeamGrid team={pageContent.team} />}

                {/* Testimonials */}
                {pageContent.testimonials && pageContent.testimonials.length > 0 && (
                  <TestimonialsSection testimonials={pageContent.testimonials} />
                )}

                {/* CTA Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-8 text-white text-center"
                >
                  <TrendingUp className="w-10 h-10 text-accent mx-auto mb-3" />
                  <h3 className="text-xl font-display font-bold mb-2">Ready to Take the Next Step?</h3>
                  <p className="text-white/70 mb-6 text-sm">Join thousands of students who have transformed their careers with IMR International.</p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <button
                      onClick={() => setLocation("/admission/enquiry")}
                      className="bg-accent hover:bg-yellow-400 text-accent-foreground font-bold px-6 py-2.5 rounded-xl transition-all text-sm"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => setLocation("/programs")}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm"
                    >
                      View All Programs <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* ── Sidebar ────────────────────────────────────── */}
              <div className="space-y-5">
                <div className="bg-white rounded-2xl shadow-xl shadow-primary/5 border border-border sticky top-28 overflow-hidden">
                  {/* Sidebar header */}
                  <div className="bg-gradient-to-r from-primary to-blue-700 px-6 py-4">
                    <h3 className="text-white font-display font-bold">Quick Information</h3>
                  </div>

                  <div className="p-6 space-y-5">
                    {pageContent.duration && (
                      <div className="flex gap-4 items-center p-3 rounded-xl bg-muted/40">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium">Duration</p>
                          <p className="font-bold text-foreground text-sm">{pageContent.duration}</p>
                        </div>
                      </div>
                    )}

                    {pageContent.eligibility && (
                      <div className="flex gap-4 items-center p-3 rounded-xl bg-muted/40">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium">Eligibility</p>
                          <p className="font-bold text-foreground text-sm">{pageContent.eligibility}</p>
                        </div>
                      </div>
                    )}

                    {pageContent.career && (
                      <div className="flex gap-4 items-start p-3 rounded-xl bg-muted/40">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium mb-1">Career Prospects</p>
                          <p className="font-semibold text-foreground text-sm leading-relaxed">{pageContent.career}</p>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-border pt-4 space-y-3">
                      <button
                        onClick={() => setLocation("/admission/enquiry")}
                        className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 text-sm"
                      >
                        Apply Now
                      </button>
                      <button
                        onClick={() => setLocation("/admission/process")}
                        className="w-full py-3 bg-transparent border-2 border-primary text-primary hover:bg-primary/5 rounded-xl font-bold transition-all duration-300 text-sm"
                      >
                        Admission Process
                      </button>
                      <button
                        onClick={() => setLocation("/admission/scholarship")}
                        className="w-full py-3 bg-accent/10 border border-accent text-accent-foreground hover:bg-accent/20 rounded-xl font-bold transition-all duration-300 text-sm"
                      >
                        Check Scholarships
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact card */}
                <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
                  <h4 className="font-bold text-foreground mb-4 text-sm">Need Help? Contact Us</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="text-lg">📞</span>
                      <a href="tel:+919938080165" className="hover:text-primary font-medium">+91-9938080165</a>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="text-lg">✉️</span>
                      <a href="mailto:imrinternational11@gmail.com" className="hover:text-primary font-medium text-xs">imrinternational11@gmail.com</a>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="text-lg">📍</span>
                      <span className="text-xs">07 District Centre, CS Pur, Bhubaneswar</span>
                    </div>
                  </div>
                </div>

                {/* Related programs */}
                <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
                  <h4 className="font-bold text-foreground mb-4 text-sm">Popular Programs</h4>
                  <div className="space-y-2">
                    {[
                      { label: "AI & Machine Learning", slug: "certification/ai-machine-learning" },
                      { label: "Data Science with Python-R", slug: "certification/data-science-python" },
                      { label: "BBA Program", slug: "education/bba" },
                      { label: "Digital Marketing", slug: "certification/digital-marketing" },
                    ].map((p) => (
                      <button
                        key={p.slug}
                        onClick={() => setLocation(`/${p.slug}`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-primary/5 hover:text-primary text-left transition-all group text-sm"
                      >
                        <span className="text-muted-foreground group-hover:text-primary">{p.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
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
