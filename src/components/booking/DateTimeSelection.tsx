import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { ClientForm } from "./ClientForm";

const timeSlots = [
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
  "6:00 PM - 8:00 PM",
];

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
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showClientForm, setShowClientForm] = useState(false);

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setShowClientForm(true);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] bg-background/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light">Pick a Date & Time</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="h-5 w-5" />
                <span>Select a date</span>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>
            {selectedDate && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>Select a time slot</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedTime === slot ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setSelectedTime(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <Button
              className="mt-4"
              disabled={!selectedDate || !selectedTime}
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
          time: selectedTime,
        }}
      />
    </>
  );
};