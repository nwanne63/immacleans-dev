import { Button } from "./ui/button";
import { useState } from "react";
import { ServiceSelection } from "./booking/ServiceSelection";

export const Hero = () => {
  const [showServiceSelection, setShowServiceSelection] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
          Professional Cleaning Services
          <br /> for Your Home
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Experience the difference of pristine living spaces with our premium cleaning
          services.
        </p>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
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
