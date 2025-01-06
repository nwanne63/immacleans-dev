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

    // Get the site URL from environment variables or use a default
    const siteUrl = process.env.URL || process.env.DEPLOY_URL || 'http://localhost:8888';

    // Submit to Netlify's Forms API
    const response = await fetch(`${siteUrl}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: netlifyFormData.toString(),
    });

    if (!response.ok) {
      console.error('Netlify Forms submission failed:', await response.text());
      throw new Error(`Failed to submit to Netlify Forms: ${response.status} ${response.statusText}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submitted successfully" }),
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: "Failed to process form submission",
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};