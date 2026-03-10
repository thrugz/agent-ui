'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const ChatBlankState = () => {
  return (
    <section
      className="flex flex-col items-center justify-center gap-y-6 text-center font-geist"
      aria-label="Welcome message"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-red-600/20 blur-3xl" />
        <Image
          src="/skarnlabs-pyramid.webp"
          alt="Skarnlabs"
          width={140}
          height={140}
          className="relative drop-shadow-[0_0_32px_rgba(220,38,38,0.4)]"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center gap-y-1"
      >
        <h1 className="text-xl font-semibold tracking-widest uppercase text-primary">
          Skarnlabs
        </h1>
        <p className="text-xs tracking-widest uppercase text-muted-foreground/60">
          Agent Interface
        </p>
      </motion.div>
    </section>
  )
}

export default ChatBlankState
