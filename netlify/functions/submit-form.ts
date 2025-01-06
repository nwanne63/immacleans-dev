import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

export const handler: Handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing form data" }),
    };
  }

  try {
    const formData = JSON.parse(event.body);
    const formName = formData.form; // e.g., 'contact' or 'booking'

    if (!formName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing form name" }),
      };
    }

    // Prepare data for Netlify Forms
    const netlifyFormData = new URLSearchParams();
    netlifyFormData.append("form-name", formName);

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "form") {
        netlifyFormData.append(key, String(value));
      }
    });

    // Get site URL
    const siteUrl = process.env.URL || process.env.DEPLOY_URL || "http://localhost:8888";

    // Submit to Netlify Forms API
    const response = await fetch(`${siteUrl}/?form-name=${formName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: netlifyFormData.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Netlify Forms submission failed: ${response.status} ${response.statusText}`);
      console.error(`Response body: ${errorText}`);
      throw new Error("Failed to submit form");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submitted successfully" }),
    };
  } catch (error) {
    console.error("Form submission error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to process form submission",
        error: error.message,
      }),
    };
  }
};
