import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { FloatingBubbles } from "@/components/FloatingBubbles";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-auto">
      <FloatingBubbles />
      <div className="fixed top-6 left-6 flex items-center gap-2 animate-fade-in z-10">
        <img 
          src="/immas-cleaning-logo.svg" 
          alt="Imma's Cleaning Logo" 
          className="w-12 h-12"
        />
      </div>
      <div className="relative z-10">
        <Hero />
        <Services />
        <Contact />
      </div>
    </div>
  );
};

export default Index;