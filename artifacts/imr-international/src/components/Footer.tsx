import { MapPin, Phone, Mail, ArrowRight, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 pt-20 pb-8 border-t border-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Col 1: Contact */}
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-white">IMR <span className="text-primary">INTERNATIONAL</span></h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Empowering students through Smart Digital Innovation and shaping the leaders of tomorrow.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm">07 District Centre, CS Pur,<br/>Bhubaneswar, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm">+91 9938080165</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm">imrinternational11@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: About */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-4 h-1 bg-accent rounded-full"></span>
              IMR International
            </h4>
            <ul className="space-y-3">
              {['Mission & Vision', 'Executive Board Member', 'Advisory Board Member', 'Governing Body', 'President Message'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm hover:text-accent flex items-center gap-2 group transition-colors">
                    <ArrowRight className="w-3 h-3 text-primary group-hover:text-accent transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Education */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-4 h-1 bg-accent rounded-full"></span>
              Smart Education
            </h4>
            <ul className="space-y-3">
              {['Bachelor of Business Administration', 'Bachelor of Computer Application', 'Bachelor of Science in Data Science', 'Skill-Based Program', 'Campus to Corporate'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm hover:text-accent flex items-center gap-2 group transition-colors">
                    <ArrowRight className="w-3 h-3 text-primary group-hover:text-accent transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Certification */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-4 h-1 bg-accent rounded-full"></span>
              Digital Certification
            </h4>
            <ul className="space-y-3">
              {['AI & Machine Learning', 'Data Science', 'Blockchain Technology', 'Digital Marketing', 'Ethical Hacking'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm hover:text-accent flex items-center gap-2 group transition-colors">
                    <ArrowRight className="w-3 h-3 text-primary group-hover:text-accent transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} IMR International. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
