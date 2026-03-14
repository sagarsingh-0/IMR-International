import { MapPin, Phone, Mail } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground py-2 text-sm font-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 hover:text-accent transition-colors duration-200 cursor-default">
          <MapPin className="w-4 h-4 text-accent" />
          <span>07 District Centre, CS Pur, Bhubaneswar</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="tel:+919938080165" className="flex items-center gap-2 hover:text-accent transition-colors duration-200">
            <Phone className="w-4 h-4 text-accent" />
            <span>+91-9938080165</span>
          </a>
          <a href="mailto:imrinternational11@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors duration-200">
            <Mail className="w-4 h-4 text-accent" />
            <span className="hidden sm:inline">imrinternational11@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
