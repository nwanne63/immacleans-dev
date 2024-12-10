import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Brush } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-6 left-6 flex items-center gap-2 animate-fade-in">
        <Brush className="w-8 h-8 text-primary" />
        <span className="font-light text-xl tracking-tight">ImmaCleans</span>
      </div>
      <Hero />
      <Services />
      <Contact />
    </div>
  );
};

export default Index;