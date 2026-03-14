import { TopBar } from "@/components/TopBar";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { MainContent } from "@/components/MainContent";
import { NewsTicker } from "@/components/NewsTicker";
import { Footer } from "@/components/Footer";
import { WhatsAppBtn } from "@/components/WhatsAppBtn";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      <TopBar />
      <Navigation />
      
      <main className="flex-grow">
        <Hero />
        <MainContent />
      </main>
      
      <NewsTicker />
      <Footer />
      <WhatsAppBtn />
    </div>
  );
}
