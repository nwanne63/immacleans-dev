import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

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
    throw error;
  }
};

export const sendContactMessage = async (data: ContactEmailData) => {
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
    throw error;
  }
};