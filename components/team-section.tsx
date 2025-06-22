"use client"

import { motion, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import ProfileCard from "./ui/ProfileCard"

export default function TeamSection({ dict, id }: { dict: any; id: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  // --- DEBUGGING LOG ---
  // This will show us exactly what data the component is receiving.
  // Check the terminal where your 'npm run dev' is running for this output.
  console.log("Data received in TeamSection:", JSON.stringify(dict.team, null, 2));

  // Read team members from the dictionary
  const teamMembers = dict.team?.members || []

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  }

  // If there are no team members, don't render the section.
  if (teamMembers.length === 0) {
    console.log("No team members found in the dictionary, so the section will not be rendered.");
    return null;
  }

  return (
    <section id={id} className="w-full py-20 bg-gray-950/50 snap-start">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">
            {dict.team.title}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
        >
          {teamMembers.map((member: any, index: number) => (
            <motion.div variants={itemVariants} key={index}>
              <ProfileCard
                name={member.name}
                title={member.title}
                handle={member.handle}
                avatarUrl={member.avatarUrl}
                status={member.status}
                contactText={member.contactText}
                enableTilt={true}
                showUserInfo={true}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
