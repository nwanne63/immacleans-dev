import { Resend } from 'resend';

// Check if API key exists and create Resend instance
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.warn('Missing RESEND_API_KEY environment variable. Email functionality will be disabled.');
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

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
  if (!resend) {
    throw new Error('Email service is not configured. Please set up your RESEND_API_KEY.');
  }

  try {
    await resend.emails.send({
      from: 'booking@immacleans.com',
      to: data.clientEmail,
      subject: 'Booking Confirmation - ImmaCleans',
      html: `
        <h1>Booking Confirmation</h1>
        <p>Dear ${data.clientName},</p>
        <p>Your booking has been confirmed:</p>
        <ul>
          <li>Service: ${data.service}</li>
          <li>Date: ${data.date.toLocaleDateString()}</li>
          <li>Time: ${data.time}</li>
        </ul>
        <p>Thank you for choosing ImmaCleans!</p>
      `,
    });
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    throw new Error('Failed to send booking confirmation email. Please try again later.');
  }
};

export const sendContactMessage = async (data: ContactEmailData) => {
  if (!resend) {
    throw new Error('Email service is not configured. Please set up your RESEND_API_KEY.');
  }

  try {
    await resend.emails.send({
      from: 'contact@immacleans.com',
      to: 'support@immacleans.com',
      subject: 'New Contact Form Submission',
      html: `
        <h1>New Contact Form Submission</h1>
        <p>From: ${data.name} (${data.email})</p>
        <p>Message:</p>
        <p>${data.message}</p>
      `,
    });
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw new Error('Failed to send contact message. Please try again later.');
  }
};