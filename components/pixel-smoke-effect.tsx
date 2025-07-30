"use client"

import { motion } from "framer-motion"

const PixelSmokeEffect = () => {
  // Create simple pixel smoke particles - much more performance friendly
  const smokePixels = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4, // 4-12px squares
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    moveX: (Math.random() - 0.5) * 200,
    moveY: Math.random() * -300 - 100,
    duration: Math.random() * 2 + 2, // 2-4 seconds
    delay: Math.random() * 1,
    opacity: Math.random() * 0.6 + 0.4,
  }))

  return (
    <motion.div
      className="fixed inset-0 z-15 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Simple green background overlay */}
      <motion.div
        className="absolute inset-0 bg-green-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Simple pixel smoke particles */}
      {smokePixels.map((pixel) => (
        <motion.div
          key={pixel.id}
          className="absolute bg-gray-600"
          style={{
            width: pixel.size,
            height: pixel.size,
            left: pixel.x,
            top: pixel.y,
            imageRendering: "pixelated",
          }}
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: [0, pixel.opacity, pixel.opacity * 0.5, 0],
            scale: [0.5, 1, 1.2, 0],
            x: pixel.moveX,
            y: pixel.moveY,
          }}
          transition={{
            duration: pixel.duration,
            delay: pixel.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Simple floating text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
      >
        <div className="bg-gray-800 border-4 border-black px-6 py-3 shadow-[8px_8px_0px_#000000]">
          <p className="text-white font-bold text-2xl md:text-3xl" style={{ fontFamily: "Arial, sans-serif" }}>
            420 TIME! 🌿
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PixelSmokeEffect
