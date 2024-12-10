import { Button } from "./ui/button";
import { useState } from "react";
import { ServiceSelection } from "./booking/ServiceSelection";

export const Hero = () => {
  const [showServiceSelection, setShowServiceSelection] = useState(false);

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Professional Cleaning Services
          </span>
          <br /> 
          <span className="text-primary">for Your Home</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Experience the difference of pristine living spaces with our premium cleaning
          services.
        </p>
        <Button
          className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity text-primary-foreground text-lg px-8 py-6"
          onClick={() => setShowServiceSelection(true)}
        >
          Book a Clean
        </Button>

        <ServiceSelection
          open={showServiceSelection}
          onOpenChange={setShowServiceSelection}
        />
      </div>
    </section>
  );
};