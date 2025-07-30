"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"

interface FallingObjectProps {
  id: number
  initialX: number
  type: "acorn" | "poop" | "pinecone"
  isSlowMotion?: boolean
  onClick: (x: number, y: number, type: "acorn" | "poop" | "pinecone") => void
}

const FallingObject = ({ id, initialX, type, isSlowMotion = false, onClick }: FallingObjectProps) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (!isClicked) {
      setIsClicked(true)
      const rect = event.currentTarget.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      onClick(x, y, type)
    }
  }

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  const getImageSrc = () => {
    switch (type) {
      case "acorn":
        return "/new-acorn.png"
      case "poop":
        return "/poop.png"
      case "pinecone":
        return "/new-pinecone.png"
      default:
        return "/new-acorn.png"
    }
  }

  const getAltText = () => {
    switch (type) {
      case "acorn":
        return "Falling acorn"
      case "poop":
        return "Poop"
      case "pinecone":
        return "Fake pinecone trap"
      default:
        return "Falling object"
    }
  }

  // RESTORED ORIGINAL SPEEDS
  const getSpeed = () => {
    const baseSpeed = type === "acorn" ? 6 : type === "poop" ? 6 : 6 // All same speed as before
    // Only acorns and pinecones are affected by slow motion
    return isSlowMotion && type !== "poop" ? baseSpeed * 3 : baseSpeed
  }

  const getRotationSpeed = () => {
    const baseRotationSpeed = type === "acorn" ? 2 : type === "poop" ? 2 : 2.5 // Original speeds
    // Only acorns and pinecones are affected by slow motion
    return isSlowMotion && type !== "poop" ? baseRotationSpeed * 3 : baseRotationSpeed
  }

  const getRotationRepeats = () => {
    const baseRepeats = type === "acorn" ? 3 : type === "poop" ? Number.POSITIVE_INFINITY : 2 // Infinite for poop
    return isSlowMotion && type !== "poop" ? Math.ceil(baseRepeats / 3) : baseRepeats
  }

  if (isClicked) {
    return null // Object disappears immediately when clicked
  }

  return (
    <motion.div
      className="absolute z-20 cursor-none game-object no-context-menu"
      style={{ left: initialX, top: -60 }}
      animate={{
        y: window.innerHeight + 100,
        rotate: type === "acorn" ? [0, 360] : type === "poop" ? [0, 360] : [0, 180, 360], // Simple rotation for poop
      }}
      transition={{
        y: { duration: getSpeed(), ease: "linear" },
        rotate: {
          duration: getRotationSpeed(),
          repeat: getRotationRepeats(),
          ease: "linear",
        },
      }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.2 }}
    >
      <motion.img
        src={getImageSrc()}
        alt={getAltText()}
        className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg no-context-menu"
        draggable={false}
        animate={
          type === "pinecone"
            ? {
                filter: [
                  "brightness(1) hue-rotate(0deg)",
                  "brightness(1.2) hue-rotate(20deg)",
                  "brightness(1) hue-rotate(0deg)",
                ],
              }
            : undefined
        }
        transition={
          type === "pinecone"
            ? {
                duration: isSlowMotion ? 4.5 : 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }
            : undefined
        }
      />
    </motion.div>
  )
}

export default FallingObject
