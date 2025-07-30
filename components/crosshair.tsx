"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const Crosshair = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]" // INCREASED Z-INDEX TO BE ABOVE ALL MODALS
      style={{
        left: mousePosition.x - 21, // Adjusted for new size (was -20)
        top: mousePosition.y - 21, // Adjusted for new size (was -20)
      }}
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 1.1, // SLOWED DOWN BY 10% (was 1)
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <svg width="42" height="42" viewBox="0 0 42 42" className="drop-shadow-lg">
        {" "}
        {/* INCREASED SIZE BY 5% (was 40x40) */}
        {/* Outer circle */}
        <circle cx="21" cy="21" r="18.9" fill="none" stroke="#000000" strokeWidth="3" opacity="0.8" />{" "}
        {/* Adjusted center and radius */}
        <circle cx="21" cy="21" r="18.9" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
        {/* Inner crosshair lines */}
        <line x1="21" y1="8.4" x2="21" y2="14.7" stroke="#000000" strokeWidth="3" opacity="0.8" />{" "}
        {/* Adjusted positions */}
        <line x1="21" y1="8.4" x2="21" y2="14.7" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
        <line x1="21" y1="27.3" x2="21" y2="33.6" stroke="#000000" strokeWidth="3" opacity="0.8" />
        <line x1="21" y1="27.3" x2="21" y2="33.6" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
        <line x1="8.4" y1="21" x2="14.7" y2="21" stroke="#000000" strokeWidth="3" opacity="0.8" />
        <line x1="8.4" y1="21" x2="14.7" y2="21" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
        <line x1="27.3" y1="21" x2="33.6" y2="21" stroke="#000000" strokeWidth="3" opacity="0.8" />
        <line x1="27.3" y1="21" x2="33.6" y2="21" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
        {/* Center dot */}
        <circle cx="21" cy="21" r="2.1" fill="#000000" opacity="0.8" /> {/* Adjusted center and radius */}
        <circle cx="21" cy="21" r="1.575" fill="#FFFFFF" opacity="0.9" /> {/* Adjusted radius (1.5 * 1.05) */}
      </svg>
    </motion.div>
  )
}

export default Crosshair
