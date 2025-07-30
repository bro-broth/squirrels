"use client"

import { motion } from "framer-motion"

const SadMemeAnimation = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Semi-transparent background overlay */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* LOSER Meme Image - Medium Size */}
      <motion.div
        className="relative z-10 bg-white border-4 border-black shadow-[8px_8px_0px_#000000] p-4"
        initial={{ scale: 0, rotate: -10 }}
        animate={{
          scale: 1,
          rotate: 0,
          y: [0, -10, 0],
        }}
        transition={{
          scale: { type: "spring", stiffness: 300 },
          rotate: { type: "spring", stiffness: 300 },
          y: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
        style={{ imageRendering: "pixelated" }}
      >
        <img
          src="/loser-squirrel.png"
          alt="LOSER! Sad squirrel meme"
          className="w-48 h-48 md:w-64 md:h-64"
          style={{ imageRendering: "pixelated" }}
        />
      </motion.div>

      {/* Additional text below the image */}
      <motion.div
        className="absolute bottom-1/4 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-2xl md:text-3xl font-bold text-red-600 pixel-font drop-shadow-[2px_2px_0px_#000000]">
          COUNTER RESET! 😢
        </p>
      </motion.div>

      {/* Floating fake peanuts around the image */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${35 + Math.random() * 30}%`,
            top: `${25 + Math.random() * 50}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8, 1],
            y: [0, -40, -20, -60, 100],
            x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
            rotate: [0, 180, 360, 540],
            opacity: [0, 1, 0.8, 0.6, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: i * 0.15,
            ease: "easeOut",
          }}
        >
          <img
            src="/fake-peanut.png"
            alt="Fake peanut"
            className="w-6 h-6 md:w-8 md:h-8"
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default SadMemeAnimation
