import emailjs from '@emailjs/browser';

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

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID_BOOKING = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_BOOKING;
const EMAILJS_TEMPLATE_ID_CONTACT = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Debug logging
console.log('EmailJS Configuration:', {
  serviceId: EMAILJS_SERVICE_ID ? 'Present' : 'Missing',
  templateIdBooking: EMAILJS_TEMPLATE_ID_BOOKING ? 'Present' : 'Missing',
  templateIdContact: EMAILJS_TEMPLATE_ID_CONTACT ? 'Present' : 'Missing',
  publicKey: EMAILJS_PUBLIC_KEY ? 'Present' : 'Missing'
});

// Initialize EmailJS with public key
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
} else {
  console.error('EmailJS public key is missing. Please check your environment variables.');
}

if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID_BOOKING || !EMAILJS_TEMPLATE_ID_CONTACT || !EMAILJS_PUBLIC_KEY) {
  console.warn('Missing EmailJS configuration. Email functionality will be disabled.');
}

export const sendBookingConfirmation = async (data: BookingEmailData) => {
  if (!EMAILJS_PUBLIC_KEY) {
    throw new Error('EmailJS configuration is missing. Please check your environment variables.');
  }

  try {
    const templateParams = {
      to_email: data.clientEmail,
      to_name: data.clientName,
      service_type: data.service,
      booking_date: data.date.toLocaleDateString(),
      booking_time: data.time,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_BOOKING,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    throw new Error('Failed to send booking confirmation email');
  }
};

export const sendContactMessage = async (data: ContactEmailData) => {
  if (!EMAILJS_PUBLIC_KEY) {
    throw new Error('EmailJS configuration is missing. Please check your environment variables.');
  }

  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_CONTACT,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw new Error('Failed to send contact message');
  }
};