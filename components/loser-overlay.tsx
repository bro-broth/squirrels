"use client"

import { motion } from "framer-motion"

const LoserOverlay = () => {
  return (
    <motion.div
      className="fixed bottom-4 right-4 z-40 pointer-events-none"
      initial={{ scale: 0, opacity: 0, x: 50 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      exit={{ scale: 0, opacity: 0, x: 50 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Static overlay without shaking animations */}
      <div
        className="bg-white border-4 border-black shadow-[6px_6px_0px_#000000] p-3 flex flex-col items-center relative"
        style={{ imageRendering: "pixelated" }}
      >
        {/* SMOKER HAHA! Image */}
        <img
          src="/loser-squirrel.png"
          alt="SMOKER HAHA! Squirrel"
          className="w-20 h-20 md:w-28 md:h-28 mb-2"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Cigarette - positioned on the squirrel */}
        <motion.div
          className="absolute top-[45%] right-[25%] z-10"
          animate={{
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {/* Cigarette body */}
          <div className="w-8 h-1 bg-white border border-gray-400 relative">
            {/* Cigarette tip (orange glow) */}
            <div className="absolute right-0 top-0 w-2 h-1 bg-orange-500 shadow-[0_0_4px_orange]"></div>
          </div>
        </motion.div>

        {/* Counter Reset Text */}
        <div className="bg-red-500 border-2 border-black px-3 py-1 mb-2">
          <p className="text-white font-bold text-xs md:text-sm" style={{ fontFamily: "Arial, sans-serif" }}>
            SMOKER HAHA!
          </p>
        </div>

        {/* Three smoking emojis with animation */}
        <div className="flex gap-2 mb-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="text-lg"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.3,
                ease: "easeInOut",
              }}
            >
              🚬
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default LoserOverlay
