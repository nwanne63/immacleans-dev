import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Menu } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="absolute top-6 left-6">
        <Menu className="w-6 h-6 text-foreground hover:text-foreground/80 transition-colors cursor-pointer" />
      </div>
      <Hero />
      <Services />
      <Contact />
    </div>
  );
};

export default Index;