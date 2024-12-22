// Since we can't call Resend API directly from frontend due to CORS,
// we'll simulate the email sending for demo purposes
// In a production environment, this should be handled by a backend service

interface BookingEmailData {
  service: string;
  date: Date;
  time: string;
  clientName: string;
  clientEmail: string;
}

interface ContactEmailData {
  name: string;
  email: string;
  message: string;
}

export const sendBookingConfirmation = async (data: BookingEmailData) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  console.log('Booking confirmation email would be sent with:', data);
  
  // In a real application, this would make a call to your backend service
  // which would then use Resend to send the email
  return Promise.resolve();
};

export const sendContactMessage = async (data: ContactEmailData) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  console.log('Contact form email would be sent with:', data);
  
  // In a real application, this would make a call to your backend service
  // which would then use Resend to send the email
  return Promise.resolve();
};