// import { Handler } from "@netlify/functions";

// export const handler: Handler = async (event) => {
//   if (event.body === null) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({ message: "Missing form data" }),
//     };
//   }

//   try {
//     const formData = JSON.parse(event.body);
    
//     // Log the form submission (you can add your own logic here)
//     console.log("Form submission received:", formData);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: "Form submitted successfully" }),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: "Failed to process form submission" }),
//     };
//   }
// };



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
    const formName = formData.form; // 'contact' or 'booking'

    if (!formName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing form name" }),
      };
    }

    // Prepare data for Netlify Forms
    const netlifyFormData = new URLSearchParams();
    netlifyFormData.append("form-name", formName); // Add form name

    // Add all fields from the form submission
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "form") {
        netlifyFormData.append(key, String(value));
      }
    });

    // Get the site URL from environment variables or fallback
    const siteUrl =
      process.env.URL || process.env.DEPLOY_URL || "http://localhost:8888";

    // Submit to Netlify's Forms API
    const response = await fetch(`${siteUrl}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: netlifyFormData.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Netlify Forms submission failed: ${response.status} ${response.statusText}`
      );
      console.error(`Response body: ${errorText}`);
      throw new Error("Failed to submit to Netlify Forms");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submitted successfully" }),
    };
  } catch (error) {
    console.error("Form submission error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to process form submission" }),
    };
  }
};
