import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DateTimeSelection } from "./DateTimeSelection";

const services = [
  {
    title: "Regular Cleaning",
    description: "Weekly or bi-weekly cleaning services",
  },
  {
    title: "Deep Cleaning",
    description: "Thorough cleaning of every corner",
  },
  {
    title: "Move In/Out",
    description: "Comprehensive cleaning for transitions",
  },
  {
    title: "One-time Clean",
    description: "Perfect for special occasions",
  },
];

export const ServiceSelection = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showDateTime, setShowDateTime] = useState(false);

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setShowDateTime(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-background/95 backdrop-blur-sm max-h-[80vh] overflow-auto">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-light">Choose a Service</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 pt-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="group relative p-6 rounded-lg border bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300"
              >
                <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button
                  className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => handleServiceSelect(service.title)}
                >
                  Select Service
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <DateTimeSelection
        open={showDateTime}
        onOpenChange={setShowDateTime}
        selectedService={selectedService}
      />
    </>
  );
};