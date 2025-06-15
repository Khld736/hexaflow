"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import ThemeLogo from "@/components/theme-logo"
import { useEffect, useState } from "react"
import AnimatedBackground from "./animated-background"

export default function HeroSection({ dict }: { dict: any }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <section className="relative h-screen w-full flex items-center justify-center" />
  }

  return (
    <section className="relative h-screen w-full flex items-center justify-center snap-start">
      <AnimatedBackground />

      <div className="container flex flex-col items-center justify-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <ThemeLogo className="h-24 w-24 md:h-32 md:w-32 mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono mb-4"
        >
          HexaFlow_
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl lg:text-3xl font-mono text-muted-foreground"
        >
          <TypewriterEffect text={dict.hero.tagline} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
        className="absolute bottom-8 z-10"
      >
        <ChevronDown className="h-8 w-8 text-primary" />
      </motion.div>
    </section>
  )
}

function TypewriterEffect({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setDisplayText(text.substring(0, index))
      index++

      if (index > text.length) {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [text])

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
