import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { BookingConfirmation } from "./BookingConfirmation";
import { toast } from "sonner";
import { sendBookingConfirmation } from "@/utils/email";

interface BookingDetails {
  service: string | null;
  date: Date | undefined;
  time: string | null;
}

export const ClientForm = ({
  open,
  onOpenChange,
  bookingDetails,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingDetails: BookingDetails;
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // UK phone validation (basic)
    const phoneRegex = /^(\+44|0)[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid UK phone number");
      return;
    }

    setIsSubmitting(true);
    try {
      if (bookingDetails.date) {
        await sendBookingConfirmation({
          service: bookingDetails.service || "",
          date: bookingDetails.date,
          time: bookingDetails.time || "",
          clientName: `${formData.firstName} ${formData.lastName}`,
          clientEmail: formData.email,
        });
      }

      // Submit to Netlify Forms
      const formElement = e.target as HTMLFormElement;
      const formDataForNetlify = new FormData(formElement);
      formDataForNetlify.append("service", bookingDetails.service || "");
      formDataForNetlify.append("date", bookingDetails.date?.toString() || "");
      formDataForNetlify.append("time", bookingDetails.time || "");
      
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formDataForNetlify as any).toString(),
      })
        .then(() => {
          setShowConfirmation(true);
          onOpenChange(false);
        })
        .catch((error) => console.log(error));

    } catch (error) {
      toast.error("Failed to confirm booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Details
            </DialogTitle>
          </DialogHeader>
          <form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            name="booking"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="booking" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Confirming..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <BookingConfirmation
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        bookingDetails={bookingDetails}
        clientDetails={formData}
      />
    </>
  );
};