"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Search, Paintbrush, Code, RefreshCw } from "lucide-react"

export default function AboutSection({ dict, id }: { dict: any; id: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const processSteps = [
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: dict.about.discover,
      description: "We learn about your business, goals, and challenges.",
    },
    {
      icon: <Paintbrush className="h-8 w-8 text-primary" />,
      title: dict.about.design,
      description: "We create wireframes and prototypes to visualize solutions.",
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: dict.about.build,
      description: "We develop robust, scalable software solutions.",
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-primary" />,
      title: dict.about.iterate,
      description: "We continuously improve based on feedback and metrics.",
    },
  ]

  return (
    <section id={id} className="min-h-screen w-full py-20 flex items-center bg-muted/30 snap-start">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">{dict.about.title}</h2>
          <p className="text-xl max-w-3xl mx-auto text-muted-foreground">{dict.about.mission}</p>
        </motion.div>

        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold font-mono text-center mb-12"
          >
            {dict.about.process_title}
          </motion.h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30 rounded-full" />

            {/* Timeline items */}
            <div className="space-y-24">
              {processSteps.map((step, index) => (
                <TimelineItem
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  isInView={isInView}
                  delay={0.3 + index * 0.2}
                  isLeft={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({
  icon,
  title,
  description,
  isInView,
  delay,
  isLeft,
}: {
  icon: React.ReactNode
  title: string
  description: string
  isInView: boolean
  delay: number
  isLeft: boolean
}) {
  return (
    <div className="relative">
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay }}
        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10"
      >
        {icon}
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
          transition={{ duration: 0.5, delay }}
          className={`md:text-right ${isLeft ? "md:col-start-1" : "md:col-start-2"}`}
        >
          <h4 className="text-xl font-bold font-mono mb-2">{title}</h4>
          <p className="text-muted-foreground">{description}</p>
        </motion.div>

        {/* Empty column for spacing */}
        <div className={isLeft ? "md:col-start-2" : "md:col-start-1"} />
      </div>
    </div>
  )
}
