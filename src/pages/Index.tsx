import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { FloatingBubbles } from "@/components/FloatingBubbles";
import { Brush } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBubbles />
      <div className="fixed top-6 left-6 flex items-center gap-2 animate-fade-in z-10">
        <div className="relative">
          <Brush className="w-8 h-8 text-primary transform -rotate-12" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xl">IC</span>
        </div>
        <span className="font-light text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          ImmaCleans
        </span>
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