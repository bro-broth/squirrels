"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const FloatingClouds = () => {
  const [clouds, setClouds] = useState<any[]>([])

  // Generate clouds with random timing and direction
  useEffect(() => {
    const generateCloud = () => {
      const direction = Math.random() > 0.5 ? "left-to-right" : "right-to-left"
      const newCloud = {
        id: Date.now() + Math.random(),
        size: 0.7 + Math.random() * 0.5, // 0.7 to 1.2 scale
        initialY: 10 + Math.random() * 60, // Random height between 10% and 70%
        speed: 20 + Math.random() * 20, // Random speed 20-40 seconds
        direction,
      }

      setClouds((prev) => [...prev, newCloud])

      // Remove cloud after it finishes animation
      setTimeout(
        () => {
          setClouds((prev) => prev.filter((cloud) => cloud.id !== newCloud.id))
        },
        (newCloud.speed + 5) * 1000,
      )
    }

    // Generate first 3 clouds immediately
    generateCloud()
    setTimeout(generateCloud, 1000)
    setTimeout(generateCloud, 3000)

    // Then generate clouds at shorter random intervals (3-8 seconds) for more clouds
    const interval = setInterval(
      () => {
        generateCloud()
      },
      (3 + Math.random() * 5) * 1000,
    ) // 3-8 seconds instead of 5-15

    return () => clearInterval(interval)
  }, []) // Remove clouds.length dependency to fix the infinite loop

  return (
    <>
      {clouds.map((cloud) => {
        const isLeftToRight = cloud.direction === "left-to-right"

        return (
          <motion.div
            key={cloud.id}
            className="absolute z-5"
            style={{
              left: isLeftToRight ? -200 : window.innerWidth + 200,
              top: `${cloud.initialY}%`,
              transform: `scale(${cloud.size}) ${isLeftToRight ? "" : "scaleX(-1)"}`,
            }}
            animate={{
              x: isLeftToRight
                ? [0, window.innerWidth + 400] // Left to right
                : [0, -(window.innerWidth + 400)], // Right to left
              y: [0, -10, 5, -5, 0], // Gentle floating motion
            }}
            transition={{
              x: {
                duration: cloud.speed,
                ease: "linear",
              },
              y: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            <img src="/new-cloud.png" alt="Cloud" className="w-32 h-20 md:w-40 md:h-24 opacity-90" />
          </motion.div>
        )
      })}
    </>
  )
}

export default FloatingClouds
