import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ChevronRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_DATA = [
  {
    title: "About Us",
    items: [
      {
        title: "About IMR INTERNATIONAL",
        subItems: [
          { title: "IMR INTERNATIONAL", href: "/about/imr-international" },
          { title: "Objectives", href: "/about/objectives" },
          { title: "Mission & Vision", href: "/about/mission-vision" },
          { title: "Recognition", href: "/about/recognition" },
          { title: "Principal Message", href: "/about/principal-message" },
        ],
      },
      { title: "Executive Board Member", href: "/about/executive-board" },
      { title: "Advisory Board Member", href: "/about/advisory-board" },
      { title: "Governing Body", href: "/about/governing-body" },
      { title: "President Message", href: "/about/president-message" },
      { title: "Chairman Message", href: "/about/chairman-message" },
    ],
  },
  {
    title: "Education",
    items: [
      {
        title: "Professional Education",
        subItems: [
          { title: "BBA", href: "/education/bba" },
          { title: "BCA", href: "/education/bca" },
          { title: "BSc Data Science", href: "/education/bsc-data-science" },
        ],
      },
      {
        title: "Corporate Education",
        subItems: [
          { title: "Skill-Based Program", href: "/education/skill-based-program" },
          { title: "Leadership Program", href: "/education/leadership-program" },
          { title: "Campus to Corporate Program", href: "/education/campus-to-corporate" },
        ],
      },
      {
        title: "SMART Education",
        subItems: [
          { title: "Adaptive Learning Program", href: "/education/adaptive-learning" },
          { title: "SMART Employability Program", href: "/education/smart-employability" },
          { title: "Collaborative Sprint Program", href: "/education/collaborative-sprint" },
        ],
      },
    ],
  },
  {
    title: "Certification",
    items: [
      {
        title: "Technology Certificate",
        subItems: [
          { title: "AI & Machine Learning", href: "/certification/ai-machine-learning" },
          { title: "Data Science with Python-R", href: "/certification/data-science-python" },
          { title: "Business Data Analytics", href: "/certification/business-data-analytics" },
          { title: "Ethical Hacking", href: "/certification/ethical-hacking" },
          { title: "Blockchain Technology", href: "/certification/blockchain-technology" },
        ],
      },
      {
        title: "Management Certificate",
        subItems: [
          { title: "Digital Marketing", href: "/certification/digital-marketing" },
          { title: "Financial Technology", href: "/certification/financial-technology" },
          { title: "Project Management", href: "/certification/project-management" },
          { title: "HR Analytics", href: "/certification/hr-analytics" },
          { title: "Supply Chain Analytics", href: "/certification/supply-chain-analytics" },
        ],
      },
      {
        title: "Project and Internship",
        subItems: [
          { title: "Live Project", href: "/certification/live-project" },
          { title: "Summer Internship Project", href: "/certification/summer-internship" },
        ],
      },
    ],
  },
  {
    title: "Focus Centers",
    items: [
      { title: "Centre for Research", href: "/focus/centre-for-research" },
      { title: "Centre for Training & Placement", href: "/focus/training-placement" },
      { title: "Centre for Student Development", href: "/focus/student-development" },
      { title: "Centre for Women Empowerment", href: "/focus/women-empowerment" },
      {
        title: "Centre for Consulting",
        subItems: [
          { title: "NBA", href: "/focus/consulting-nba" },
          { title: "NAAC", href: "/focus/consulting-naac" },
        ],
      },
    ],
  },
  {
    title: "Insights",
    items: [
      { title: "Faculty Council", href: "/insights/faculty-council" },
      { title: "30 Student Club", href: "/insights/student-club" },
      { title: "20-20 Boot Camp", href: "/insights/boot-camp" },
    ],
  },
  {
    title: "Admission",
    items: [
      { title: "Admission Process", href: "/admission/process" },
      { title: "Scholarship", href: "/admission/scholarship" },
      { title: "Educational Loan", href: "/admission/educational-loan" },
      { title: "Admission Enquiry", href: "/admission/enquiry" },
      { title: "Registration", href: "/register" },
    ],
  },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo Section */}
          <Link href="/">
            <div className="flex flex-shrink-0 items-center gap-4 cursor-pointer group">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 p-2 overflow-hidden group-hover:shadow-primary/30 transition-shadow">
                <img 
                  src={`${import.meta.env.BASE_URL}images/logo.png`} 
                  alt="IMR Logo" 
                  className="w-full h-full object-contain drop-shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement?.classList.add('flex');
                  }}
                />
                <GraduationCap className="w-8 h-8 text-white hidden" />
              </div>
              <div className="flex flex-col">
                <h1 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors">
                  IMR <span className="text-primary group-hover:text-secondary transition-colors">INTERNATIONAL</span>
                </h1>
                <p className="text-[0.65rem] sm:text-xs font-semibold text-muted-foreground tracking-widest hidden md:block uppercase">
                  SMART <span className="text-accent px-1">•</span> DIGITAL <span className="text-accent px-1">•</span> INNOVATION
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1">
            <Link href="/" className="px-3 py-2 text-sm font-bold text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            
            {NAV_DATA.map((category, idx) => (
              <div key={idx} className="relative nav-item-group">
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-bold text-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/5">
                  {category.title}
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </button>
                
                {/* Dropdown 1 */}
                <div className="nav-dropdown py-2">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="relative nav-subitem-group px-2">
                      {'href' in item ? (
                        <Link href={item.href} className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-left rounded-md transition-colors text-foreground hover:bg-primary/10 hover:text-primary font-medium">
                          {item.title}
                        </Link>
                      ) : (
                        <button className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-left rounded-md transition-colors text-foreground hover:bg-primary/10 hover:text-primary font-medium">
                          {item.title}
                          {item.subItems && <ChevronRight className="w-4 h-4 opacity-50" />}
                        </button>
                      )}

                      {/* Sub-dropdown 2 */}
                      {item.subItems && (
                        <div className="nav-subdropdown py-2">
                          {item.subItems.map((sub, subIdx) => (
                            <div key={subIdx} className="px-2">
                              <Link href={sub.href} className="w-full block text-left px-3 py-2 text-sm rounded-md text-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium">
                                {sub.title}
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLocation('/admission/enquiry')}
              className="hidden md:flex bg-gradient-to-r from-accent to-yellow-500 hover:from-yellow-500 hover:to-accent text-accent-foreground px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-accent/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Apply Now
            </button>
            <button 
              className="xl:hidden p-2 text-foreground hover:bg-muted rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-xl max-h-[75vh] overflow-y-auto z-50">
          <div className="px-4 py-6 flex flex-col gap-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-bold text-foreground text-lg border-b border-border/50 pb-2">
              Home
            </Link>
            {NAV_DATA.map((category, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <h3 className="font-bold text-primary border-b border-border/50 pb-1">{category.title}</h3>
                <div className="flex flex-col pl-3 border-l-2 border-primary/10 gap-2">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      {'href' in item ? (
                        <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-left text-foreground hover:text-primary py-1">
                          {item.title}
                        </Link>
                      ) : (
                        <div className="text-sm font-semibold text-left text-muted-foreground py-1">
                          {item.title}
                        </div>
                      )}
                      
                      {item.subItems && (
                        <div className="flex flex-col pl-3 border-l-2 border-border/50 gap-2 mt-1">
                          {item.subItems.map((sub, j) => (
                            <Link key={j} href={sub.href} onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-foreground hover:text-primary">
                              {sub.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setLocation('/admission/enquiry');
              }}
              className="mt-4 w-full bg-accent text-accent-foreground py-3 rounded-xl font-bold shadow-md"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
