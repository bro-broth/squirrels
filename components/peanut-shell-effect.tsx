"use client"

import { motion } from "framer-motion"

interface PeanutShellEffectProps {
  x: number
  y: number
}

const PeanutShellEffect = ({ x, y }: PeanutShellEffectProps) => {
  // Create 6-8 peanut shells with different trajectories
  const shells = Array.from({ length: Math.floor(Math.random() * 3) + 6 }, (_, i) => ({
    id: i,
    angle: Math.random() * 360, // Random angle in degrees
    distance: Math.random() * 80 + 40, // Random distance
    size: Math.random() * 6 + 8, // Random size between 8-14px
    rotation: Math.random() * 720 - 360, // Random rotation between -360 and 360 degrees
    duration: Math.random() * 1 + 1.5, // Animation duration between 1.5-2.5s
  }))

  return (
    <div className="fixed pointer-events-none z-25" style={{ left: x - 30, top: y - 30 }}>
      {shells.map((shell) => (
        <motion.div
          key={shell.id}
          className="absolute"
          style={{
            left: 30,
            top: 30,
          }}
          initial={{ scale: 0.5, opacity: 1, rotate: 0 }}
          animate={{
            x: Math.cos((shell.angle * Math.PI) / 180) * shell.distance,
            y: Math.sin((shell.angle * Math.PI) / 180) * shell.distance + 100, // Add 100 to make shells fall down more
            scale: [0.5, 1, 0.8],
            opacity: [1, 1, 0],
            rotate: shell.rotation,
          }}
          transition={{
            duration: shell.duration,
            ease: "easeOut",
          }}
        >
          <img
            src="/peanut-shell.png"
            alt="Peanut shell"
            className="pixel-art"
            style={{
              width: `${shell.size}px`,
              height: `${shell.size}px`,
              imageRendering: "pixelated",
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default PeanutShellEffect
