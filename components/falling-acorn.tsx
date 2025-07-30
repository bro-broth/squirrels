"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface FallingAcornProps {
  id: number
  initialX: number
  onClick: () => void
}

const FallingAcorn = ({ id, initialX, onClick }: FallingAcornProps) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true)
      onClick()
    }
  }

  if (isClicked) {
    return (
      <motion.div
        className="absolute z-20 pointer-events-none"
        style={{ left: initialX, top: window.innerHeight / 2 }}
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: [1, 1.5, 0],
          opacity: [1, 1, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/acorn.png"
          alt="Cracked acorn"
          className="w-12 h-12 md:w-16 md:h-16"
          style={{ imageRendering: "pixelated" }}
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      className="absolute z-20 cursor-pointer hover:scale-110 transition-transform"
      style={{ left: initialX, top: -60 }}
      animate={{
        y: window.innerHeight + 100,
        rotate: [0, 360],
      }}
      transition={{
        y: { duration: 6, ease: "linear" },
        rotate: { duration: 2, repeat: 3, ease: "linear" },
      }}
      onClick={handleClick}
      whileTap={{ scale: 1.2 }}
    >
      <motion.img
        src="/acorn.png"
        alt="Falling acorn"
        className="w-12 h-12 md:w-16 md:h-16 drop-shadow-[2px_2px_0px_#000000]"
        style={{ imageRendering: "pixelated" }}
        whileHover={{
          filter: "brightness(1.2)",
          scale: 1.1,
        }}
      />
    </motion.div>
  )
}

export default FallingAcorn
