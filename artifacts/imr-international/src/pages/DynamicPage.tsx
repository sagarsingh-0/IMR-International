import { useParams, useLocation } from "wouter";
import { TopBar } from "@/components/TopBar";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppBtn } from "@/components/WhatsAppBtn";
import { PAGE_DATA } from "@/data/programs";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, GraduationCap, ChevronRight, Briefcase } from "lucide-react";

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
            <h2 className="text-4xl font-display font-bold text-primary mb-4">404 - Not Found</h2>
            <p className="text-muted-foreground mb-8">The page you are looking for does not exist.</p>
            <button 
              onClick={() => setLocation('/')}
              className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
            >
              Return Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      <TopBar />
      <Navigation />
      
      <main className="flex-grow">
        {/* Page Hero */}
        <div className="relative h-64 sm:h-80 flex items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0 opacity-50">
            <img 
              src={`${import.meta.env.BASE_URL}images/page-header.png`}
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-white">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-4 uppercase tracking-wider">
              <span>{category.replace('-', ' ')}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-accent">{pageContent.title}</span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-display font-bold leading-tight"
            >
              {pageContent.title}
            </motion.h1>
            {pageContent.subtitle && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-xl text-slate-200"
              >
                {pageContent.subtitle}
              </motion.p>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">Overview</h2>
                <div className="prose max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed text-lg">
                  {pageContent.overview}
                </div>
              </section>

              {pageContent.topics && pageContent.topics.length > 0 && (
                <section>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-6">Curriculum & Topics Covered</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {pageContent.topics.map((topic, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/20 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="font-medium text-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {pageContent.highlights && pageContent.highlights.length > 0 && (
                <section>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-6">Key Highlights</h3>
                  <ul className="space-y-4">
                    {pageContent.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-lg text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Sidebar / Quick Facts */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl shadow-primary/5 border border-border sticky top-32">
                <h3 className="text-xl font-display font-bold text-foreground mb-6 border-b border-border pb-4">Program Details</h3>
                
                <div className="space-y-6">
                  {pageContent.duration && (
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">Duration</p>
                        <p className="font-bold text-foreground">{pageContent.duration}</p>
                      </div>
                    </div>
                  )}

                  {pageContent.eligibility && (
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">Eligibility</p>
                        <p className="font-bold text-foreground">{pageContent.eligibility}</p>
                      </div>
                    </div>
                  )}

                  {pageContent.career && (
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">Career Prospects</p>
                        <p className="font-bold text-foreground">{pageContent.career}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 space-y-3">
                  <button 
                    onClick={() => setLocation('/admission/enquiry')}
                    className="w-full py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Apply Now
                  </button>
                  <button 
                    onClick={() => setLocation('/admission/process')}
                    className="w-full py-3.5 bg-transparent border-2 border-primary text-primary hover:bg-primary/5 rounded-xl font-bold transition-all duration-300"
                  >
                    Admission Process
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
      <WhatsAppBtn />
    </div>
  );
}
