"use client"

import { motion } from "framer-motion"

interface PineconeSmokeEffectProps {
  x: number
  y: number
}

const PineconeSmokeEffect = ({ x, y }: PineconeSmokeEffectProps) => {
  // Create small white-orange smoke particles
  const smokeParticles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 15 + 10, // Smaller particles (10-25px)
    opacity: Math.random() * 0.6 + 0.4, // Higher opacity for visibility
    angle: Math.random() * 120 + 30, // Spread upward (30-150 degrees)
    distance: Math.random() * 40 + 20, // Shorter distance
    duration: Math.random() * 1.5 + 1, // 1-2.5 seconds
    color: i % 2 === 0 ? "#FFFFFF" : "#FFA500", // Alternating white and orange
  }))

  return (
    <div className="fixed pointer-events-none z-25" style={{ left: x - 20, top: y - 20 }}>
      {smokeParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: 20,
            top: 20,
            filter: "blur(2px)", // Light blur for smoke effect
            boxShadow:
              particle.color === "#FFA500" ? "0 0 8px rgba(255, 165, 0, 0.6)" : "0 0 6px rgba(255, 255, 255, 0.8)",
          }}
          initial={{
            scale: 0.3,
            opacity: particle.opacity,
          }}
          animate={{
            scale: [0.3, 1, 1.2, 0],
            x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
            y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance - 30, // Move upward
            opacity: [particle.opacity, particle.opacity * 0.8, particle.opacity * 0.4, 0],
          }}
          transition={{
            duration: particle.duration,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Additional wispy smoke trails */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`wisp-${i}`}
          className="absolute"
          style={{
            width: Math.random() * 20 + 15,
            height: Math.random() * 8 + 4,
            backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FFB347", // Light orange
            left: 20 + (Math.random() - 0.5) * 10,
            top: 20,
            borderRadius: "50px",
            filter: "blur(3px)",
            opacity: 0.7,
          }}
          initial={{
            scaleY: 0.2,
            opacity: 0.7,
          }}
          animate={{
            scaleY: [0.2, 1, 1.5, 0],
            scaleX: [1, 1.2, 0.8, 0.3],
            y: [0, -25, -45, -70],
            x: (Math.random() - 0.5) * 30,
            opacity: [0.7, 0.5, 0.2, 0],
          }}
          transition={{
            duration: Math.random() * 1 + 1.5,
            delay: i * 0.2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

export default PineconeSmokeEffect
