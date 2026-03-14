import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown, ChevronRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

// Complex Navigation Structure Data
const NAV_DATA = [
  {
    title: "About Us",
    items: [
      {
        title: "About IMR INTERNATIONAL",
        subItems: ["IMR INTERNATIONAL", "Objectives", "Mission & Vision", "Recognition", "Principal Message"],
      },
      { title: "Executive Board Member" },
      { title: "Advisory Board Member" },
      { title: "Governing Body" },
      { title: "President Message" },
      { title: "Chairman Message" },
    ],
  },
  {
    title: "Education",
    items: [
      {
        title: "Professional Education",
        subItems: ["BBA", "BCA", "BSc Data Science"],
      },
      {
        title: "Corporate Education",
        subItems: ["Skill-Based Program", "Leadership Program", "Campus to Corporate Program"],
      },
      {
        title: "SMART Education",
        subItems: ["Adaptive Learning Program", "SMART Employability Program", "Collaborative Sprint Program"],
      },
    ],
  },
  {
    title: "Certification",
    items: [
      {
        title: "Technology Certificate",
        subItems: ["AI & Machine Learning", "Data Science with Python-R", "Business Data Analytics", "Ethical Hacking", "Blockchain Technology"],
      },
      {
        title: "Management Certificate",
        subItems: ["Digital Marketing", "Financial Technology", "Project Management", "HR Analytics", "Supply Chain Analytics"],
      },
      {
        title: "Project and Internship",
        subItems: ["Live Project", "Summer Internship Project"],
      },
    ],
  },
  {
    title: "Focus Centers",
    items: [
      { title: "Centre for Research" },
      { title: "Centre for Training & Placement" },
      { title: "Centre for Student Development" },
      { title: "Centre for Women Empowerment" },
      {
        title: "Centre for Consulting",
        subItems: ["NBA", "NAAC"],
      },
    ],
  },
  {
    title: "Insights",
    items: [
      { title: "Faculty Council" },
      { title: "30 Student Club" },
      { title: "20-20 Boot Camp" },
    ],
  },
  {
    title: "Admission",
    items: [
      { title: "Admission Process" },
      { title: "Scholarship" },
      { title: "Educational Loan" },
      { title: "Admission Enquiry" },
      { title: "Registration" },
    ],
  },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo Section */}
          <div className="flex flex-shrink-0 items-center gap-4 cursor-pointer">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 p-2 overflow-hidden">
              {/* Fallback to icon if image fails to load during dev, but use generated image */}
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
              <h1 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-foreground leading-tight">
                IMR <span className="text-primary">INTERNATIONAL</span>
              </h1>
              <p className="text-[0.65rem] sm:text-xs font-semibold text-muted-foreground tracking-widest hidden md:block uppercase">
                SMART <span className="text-accent px-1">•</span> DIGITAL <span className="text-accent px-1">•</span> INNOVATION
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1">
            <Link href="/" className="px-3 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            
            {NAV_DATA.map((category, idx) => (
              <div key={idx} className="relative nav-item-group">
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/5">
                  {category.title}
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </button>
                
                {/* Dropdown 1 */}
                <div className="nav-dropdown py-2">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="relative nav-subitem-group px-2">
                      <button className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-sm text-left rounded-md transition-colors",
                        "text-foreground hover:bg-primary/10 hover:text-primary hover:font-medium"
                      )}>
                        {item.title}
                        {item.subItems && <ChevronRight className="w-4 h-4 opacity-50" />}
                      </button>

                      {/* Sub-dropdown 2 */}
                      {item.subItems && (
                        <div className="nav-subdropdown py-2">
                          {item.subItems.map((sub, subIdx) => (
                            <div key={subIdx} className="px-2">
                              <button className="w-full text-left px-3 py-2 text-sm rounded-md text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                                {sub}
                              </button>
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
            <button className="hidden md:flex bg-gradient-to-r from-accent to-yellow-500 hover:from-yellow-500 hover:to-accent text-accent-foreground px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-accent/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
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

      {/* Mobile Menu Overlay - Simple version for demonstration */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-xl max-h-[70vh] overflow-y-auto">
          <div className="px-4 py-6 flex flex-col gap-4">
            {NAV_DATA.map((category, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <h3 className="font-bold text-primary border-b border-border/50 pb-1">{category.title}</h3>
                <div className="flex flex-col pl-3 border-l-2 border-primary/10 gap-2">
                  {category.items.map((item, i) => (
                    <button key={i} className="text-sm font-medium text-left text-foreground hover:text-primary">
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button className="mt-4 w-full bg-accent text-accent-foreground py-3 rounded-xl font-bold shadow-md">
              Apply Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
