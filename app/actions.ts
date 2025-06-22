"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function sendContactEmail({ name, email, message }: ContactFormData) {
  const toEmail = process.env.CONTACT_EMAIL
  const apiKey = process.env.RESEND_API_KEY

  // --- Start of Debugging Logs ---
  console.log("--- New Contact Form Submission ---")
  console.log(`Timestamp: ${new Date().toISOString()}`)
  console.log(`Recipient Email (CONTACT_EMAIL): ${toEmail}`)
  console.log(`Resend API Key loaded: ${apiKey ? "Yes" : "No"}`)
  // --- End of Debugging Logs ---

  if (!apiKey) {
    console.error("Resend API Key is not configured in .env.local")
    throw new Error("Server configuration error: Missing API Key.")
  }

  if (!toEmail) {
    console.error("Recipient email (CONTACT_EMAIL) is not configured in .env.local")
    throw new Error("Server configuration error: Missing recipient email.")
  }

  try {
    console.log("Attempting to send email with Resend...")
    const { data, error } = await resend.emails.send({
      // TEMPORARY FIX: Using 'onboarding@resend.dev' until your domain is verified.
      // PERMANENT FIX: Change this back to 'contact@hexaflow.dev' after verifying your domain on resend.com.
      from: "onboarding@resend.dev",
      to: toEmail,
      subject: `New contact from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      replyTo: email,
    })

    if (error) {
      console.error("Resend API Error:", error)
      throw new Error("Failed to send email due to a Resend API error.")
    }

    console.log("Email sent successfully! Response:", data)
    return { success: true }
  } catch (error) {
    console.error("Caught an exception in sendContactEmail:", error)
    // Make sure the error message is generic for the client
    throw new Error("An unexpected error occurred while sending the email.")
  }
}
