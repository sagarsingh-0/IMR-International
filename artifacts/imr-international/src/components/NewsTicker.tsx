import { Megaphone } from "lucide-react";

export function NewsTicker() {
  return (
    <div className="bg-foreground text-white py-3 overflow-hidden flex items-center border-y-4 border-accent relative z-20">
      <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-foreground via-foreground to-transparent w-16 sm:w-48 z-10 flex items-center px-4">
        <div className="flex items-center gap-2 text-accent font-bold tracking-wider text-sm sm:text-base">
          <Megaphone className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline">LATEST UPDATE</span>
        </div>
      </div>
      
      <div className="flex-1 whitespace-nowrap pl-20 sm:pl-56">
        <div className="inline-block animate-ticker text-sm sm:text-base font-medium">
          <span className="mx-8 text-accent">•</span>
          Admission open for Academic Session 2026-27
          <span className="mx-8 text-accent">•</span>
          New Batches for BBA, BCA & BSc Data Science starting soon
          <span className="mx-8 text-accent">•</span>
          Join our SMART Employability Program
          <span className="mx-8 text-accent">•</span>
          Admission open for Academic Session 2026-27
        </div>
      </div>
    </div>
  );
}
