"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function sendContactEmail({ name, email, message }: ContactFormData) {
  if (!process.env.CONTACT_EMAIL) {
    throw new Error("Contact email not configured")
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "contact@hexaflow.dev",
      to: process.env.CONTACT_EMAIL,
      subject: `New contact from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      reply_to: email,
    })

    if (error) {
      console.error("Error sending email:", error)
      throw new Error("Failed to send email")
    }

    return { success: true }
  } catch (error) {
    console.error("Error in sendContactEmail:", error)
    throw new Error("Failed to send email")
  }
}
