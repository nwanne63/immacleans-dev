import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Printer, User } from "lucide-react";
import { format } from "date-fns";

interface BookingConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingDetails: {
    service: string | null;
    date: Date | undefined;
    time: string | null;
  };
  clientDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export const BookingConfirmation = ({
  open,
  onOpenChange,
  bookingDetails,
  clientDetails,
}: BookingConfirmationProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleAddToCalendar = () => {
    if (!bookingDetails.date) return;

    const startTime = bookingDetails.time?.split(" - ")[0];
    const eventDate = format(bookingDetails.date, "yyyy-MM-dd");
    const eventTitle = `ImmaCleans - ${bookingDetails.service}`;
    const details = `Cleaning service appointment with ImmaCleans\nService: ${bookingDetails.service}`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventTitle
    )}&dates=${eventDate}T${startTime}&details=${encodeURIComponent(details)}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">Booking Confirmed!</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Booking Details</h3>
            <div className="space-y-2">
              <p>Service: {bookingDetails.service}</p>
              <p>
                Date:{" "}
                {bookingDetails.date && format(bookingDetails.date, "MMMM do, yyyy")}
              </p>
              <p>Time: {bookingDetails.time}</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Client Details</h3>
            <div className="space-y-2">
              <p>
                Name: {clientDetails.firstName} {clientDetails.lastName}
              </p>
              <p>Email: {clientDetails.email}</p>
              <p>Phone: {clientDetails.phone}</p>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleAddToCalendar}>
              <Calendar className="w-4 h-4 mr-2" />
              Add to Calendar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};