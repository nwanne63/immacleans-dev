import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing form data" }),
    };
  }

  try {
    const formData = JSON.parse(event.body);
    
    // Log the form submission (you can add your own logic here)
    console.log("Form submission received:", formData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submitted successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to process form submission" }),
    };
  }
};
