import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { ClientForm } from "./ClientForm";

export const DateTimeSelection = ({
  open,
  onOpenChange,
  selectedService,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedService: string | null;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [showClientForm, setShowClientForm] = useState(false);

  const handleContinue = () => {
    if (selectedDate) {
      setShowClientForm(true);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] bg-background/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light">Pick a Date</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="h-5 w-5" />
                <span>Select a date</span>
              </div>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full max-w-[350px]"
                />
              </div>
            </div>
            <Button
              className="mt-4"
              disabled={!selectedDate}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ClientForm
        open={showClientForm}
        onOpenChange={setShowClientForm}
        bookingDetails={{
          service: selectedService,
          date: selectedDate,
          time: "9:00 AM", // Default time since we removed time selection
        }}
      />
    </>
  );
};