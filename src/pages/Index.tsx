import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Brush } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 text-foreground">
      <div className="fixed top-6 left-6 flex items-center gap-2 animate-fade-in">
        <Brush className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent" />
        <span className="font-light text-xl tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          ImmaCleans
        </span>
      </div>
      <Hero />
      <Services />
      <Contact />
    </div>
  );
};

export default Index;