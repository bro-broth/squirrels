"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingUFOProps {
  onUFOClick: (x: number, y: number) => void
}

const FloatingUFO = ({ onUFOClick }: FloatingUFOProps) => {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [currentRoute, setCurrentRoute] = useState(0)
  const [isClicked, setIsClicked] = useState(false)
  const [showUFO, setShowUFO] = useState(false)
  const [startDirection, setStartDirection] = useState<"left" | "right">("left")
  const [startHeight, setStartHeight] = useState(0.3)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
    setScreenHeight(window.innerHeight)

    // UFO appears less frequently - every 15-30 seconds
    const spawnUFO = () => {
      // Randomly choose starting direction AND height
      setStartDirection(Math.random() > 0.5 ? "left" : "right")
      setStartHeight(0.2 + Math.random() * 0.5) // Random height between 20% and 70%
      setShowUFO(true)
      setIsClicked(false)
    }

    // First UFO after 10 seconds
    const firstTimeout = setTimeout(spawnUFO, 10000)

    // Then random intervals between 15-30 seconds
    const interval = setInterval(
      () => {
        if (!showUFO) {
          spawnUFO()
        }
      },
      (15 + Math.random() * 15) * 1000,
    )

    return () => {
      clearTimeout(firstTimeout)
      clearInterval(interval)
    }
  }, [showUFO])

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (!isClicked) {
      setIsClicked(true)
      const rect = event.currentTarget.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      onUFOClick(x, y)

      // Hide UFO after click
      setTimeout(() => {
        setShowUFO(false)
      }, 500)
    }
  }

  // Generate routes that can go both directions with random starting heights
  const generateRoutes = () => {
    if (!screenWidth || !screenHeight) return [{ x: [0], y: [0] }]

    const routes = []
    const numRoutes = 8

    for (let routeIndex = 0; routeIndex < numRoutes; routeIndex++) {
      const points = []
      const numPoints = 12

      // Use the random start height instead of fixed calculation
      const baseHeight = screenHeight * startHeight + routeIndex * 20 // Add some variation per route
      const heightVariation = 80

      // Route variations at different heights
      const routeVariations = [
        // High routes
        (progress: number) => ({
          x: progress * (screenWidth + 300),
          y: baseHeight + Math.sin(progress * Math.PI) * heightVariation,
        }),
        // Mid routes with waves
        (progress: number) => ({
          x: progress * (screenWidth + 300),
          y: baseHeight + Math.sin(progress * Math.PI * 2) * (heightVariation * 0.6),
        }),
        // Low routes
        (progress: number) => ({
          x: progress * (screenWidth + 300),
          y: baseHeight + Math.sin(progress * Math.PI * 1.5) * (heightVariation * 0.8),
        }),
        // Complex patterns
        (progress: number) => ({
          x: progress * (screenWidth + 300),
          y: baseHeight + Math.sin(progress * Math.PI * 3) * (heightVariation * 0.4),
        }),
      ]

      const routeFunction = routeVariations[routeIndex % routeVariations.length]

      for (let i = 0; i <= numPoints; i++) {
        const progress = i / numPoints
        const point = routeFunction(progress)

        // Adjust X based on direction
        const adjustedX = startDirection === "left" ? point.x - 150 : screenWidth + 150 - point.x

        points.push({
          x: adjustedX,
          y: Math.max(screenHeight * 0.15, Math.min(screenHeight * 0.75, point.y)),
        })
      }

      routes.push({
        x: points.map((p) => p.x),
        y: points.map((p) => p.y),
      })
    }

    return routes
  }

  const routes = generateRoutes()
  const trajectory = routes[currentRoute] || { x: [0], y: [0] }

  // Change route after each cycle
  const handleAnimationComplete = () => {
    setCurrentRoute((prev) => (prev + 1) % routes.length)
    // Hide UFO after completing route
    setTimeout(() => {
      setShowUFO(false)
    }, 1000)
  }

  if (!showUFO || isClicked) {
    return null // UFO is hidden
  }

  return (
    <motion.div
      className="absolute z-20 cursor-none game-object"
      initial={{ x: trajectory.x[0], y: trajectory.y[0] }}
      animate={{
        x: trajectory.x,
        y: trajectory.y,
      }}
      transition={{
        duration: ((30 + Math.random() * 10) / 1.3 / 10) * 1.1, // SLOWED DOWN BY 10% (multiply by 1.1)
        repeat: 0,
        ease: "linear",
      }}
      onAnimationComplete={handleAnimationComplete}
      onClick={handleClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 1.3 }}
    >
      <motion.img
        src="/new-ufo.png"
        alt="Flying UFO"
        className="w-11 h-11 md:w-13 md:h-13"
        style={{
          imageRendering: "pixelated",
          border: "none",
          outline: "none",
          transform: startDirection === "right" ? "scaleX(-1)" : "scaleX(1)", // Flip UFO if going right to left
        }}
        animate={{
          filter: [
            "drop-shadow(0 0 15px rgba(255,255,255,0.8))",
            "drop-shadow(0 0 25px rgba(255,0,255,0.6))",
            "drop-shadow(0 0 20px rgba(0,255,255,0.6))",
            "drop-shadow(0 0 30px rgba(255,165,0,0.7))",
            "drop-shadow(0 0 15px rgba(255,255,255,0.8))",
          ],
          rotate: [0, 3, -3, 2, -2, 0],
          scale: [1, 1.02, 0.98, 1.01, 0.99, 1],
        }}
        transition={{
          filter: {
            duration: 0.3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
          rotate: {
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
          scale: {
            duration: 0.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
      />

      {/* Floating particles around UFO */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-60"
          style={{
            left: `${11 + i * 8}px`,
            top: `${14 + i * 4}px`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1.2, 0.5],
            y: [0, -6, 0],
          }}
          transition={{
            duration: (2 + i * 0.3) / 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.04,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  )
}

export default FloatingUFO
