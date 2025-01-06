import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

export const handler: Handler = async (event) => {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing form data" }),
    };
  }

  try {
    const formData = JSON.parse(event.body);
    const formName = formData.form; // 'contact' or 'booking'
    
    // Convert the data to the format expected by Netlify Forms
    const netlifyFormData = new URLSearchParams();
    
    // Add form name
    netlifyFormData.append("form-name", formName);
    
    // Add all fields from the form submission
    Object.entries(formData).forEach(([key, value]) => {
      // Skip the 'form' field as we've already used it
      if (key !== 'form') {
        // Convert any non-string values to strings
        netlifyFormData.append(key, String(value));
      }
    });

    // Submit to Netlify's Forms API
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: netlifyFormData.toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to submit to Netlify Forms');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submitted successfully" }),
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to process form submission" }),
    };
  }
};