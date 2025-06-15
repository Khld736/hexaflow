"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Smartphone, Cpu, BarChart3, Palette, Cog } from "lucide-react"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function ServicesSection({ dict, id }: { dict: any; id: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const services = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: dict.services.web,
      description: "Modern, responsive websites and web applications",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: dict.services.mobile,
      description: "Native and cross-platform mobile applications",
    },
    {
      icon: <Cpu className="h-8 w-8 text-primary" />,
      title: dict.services.automation,
      description: "Workflow automation and process optimization",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: dict.services.ai,
      description: "AI integration and data analytics solutions",
    },
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: dict.services.design,
      description: "UI/UX design and branding",
    },
    {
      icon: <Cog className="h-8 w-8 text-primary" />,
      title: dict.services.custom,
      description: "Custom software development for unique needs",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id={id} className="min-h-screen w-full py-20 flex items-center snap-start">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">{dict.services.title}</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              variants={item}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({
  icon,
  title,
  description,
  variants,
}: {
  icon: React.ReactNode
  title: string
  description: string
  variants: any
}) {
  return (
    <motion.div
      variants={variants}
      whileHover={{
        scale: 1.03,
        rotateX: 5,
        rotateY: 5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="border-primary/20 h-full">
        <CardHeader>
          <div className="mb-2">{icon}</div>
          <CardTitle className="font-mono">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}
