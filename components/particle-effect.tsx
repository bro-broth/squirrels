"use client"

import { motion } from "framer-motion"

interface ParticleEffectProps {
  x: number
  y: number
}

const ParticleEffect = ({ x, y }: ParticleEffectProps) => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: i * 45 * (Math.PI / 180),
    distance: Math.random() * 50 + 30,
    size: Math.random() * 6 + 4,
    color: ["#8B4513", "#D2691E", "#CD853F", "#F4A460"][Math.floor(Math.random() * 4)],
  }))

  return (
    <div className="fixed pointer-events-none z-25" style={{ left: x - 20, top: y - 20 }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: 20,
            top: 20,
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            x: Math.cos(particle.angle) * particle.distance,
            y: Math.sin(particle.angle) * particle.distance + Math.random() * 20,
            scale: 0,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

export default ParticleEffect
