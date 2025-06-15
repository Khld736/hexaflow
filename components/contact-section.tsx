"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"
import { sendContactEmail } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

export default function ContactSection({ dict, id }: { dict: any; id: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    try {
      await sendContactEmail({ name, email, message })
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
      // Reset form
      event.currentTarget.reset()
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id={id} className="min-h-screen w-full py-20 flex items-center snap-start">
      <div className="container max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">{dict.contact.title}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border rounded-lg p-6 md:p-8 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  {dict.contact.name}
                </label>
                <Input id="name" name="name" required className="border-primary/20 focus-visible:ring-primary" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {dict.contact.email}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="border-primary/20 focus-visible:ring-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                {dict.contact.message}
              </label>
              <Textarea
                id="message"
                name="message"
                required
                rows={6}
                className="border-primary/20 focus-visible:ring-primary"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                {isSubmitting ? "Sending..." : dict.contact.submit}
              </Button>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{dict.contact.fallback}:</span>
                <a href="mailto:contact@hexaflow.dev" className="text-primary hover:underline">
                  contact@hexaflow.dev
                </a>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
