"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FallingObject from "@/components/falling-object"
import FloatingClouds from "@/components/floating-clouds"
import FloatingUFO from "@/components/floating-ufo"
import WalletModal from "@/components/wallet-modal"
import ParticleEffect from "@/components/particle-effect"
import PeanutShellEffect from "@/components/peanut-shell-effect"
import PineconeSmokeEffect from "@/components/pinecone-smoke-effect"
import HowItWorksModal from "@/components/how-it-works-modal"
import Crosshair from "@/components/crosshair"
import SquirrelDialog from "@/components/squirrel-dialog"
import PixelSmokeEffect from "@/components/pixel-smoke-effect"
import useSound from "use-sound"

// Functions for localStorage
const saveScoreToCache = (score: number) => {
  try {
    if (typeof window !== "undefined") {
        localStorage.setItem("squirrels-brc2-score", score.toString())
    }
  } catch (error) {
    console.error("Failed to save score to cache:", error)
  }
}

const loadScoreFromCache = (): number => {
  try {
    const savedScore = localStorage.getItem("squirrels-brc2-score")
    return savedScore ? Number.parseInt(savedScore, 10) : 0
  } catch (error) {
    console.error("Failed to load score from cache:", error)
    return 0
  }
}

interface FallingItem {
  id: number
  x: number
  y: number
  type: "acorn" | "poop" | "pinecone"
  createdAt: number
}

export default function Home() {
  const [crackedCount, setCrackedCount] = useState(() => loadScoreFromCache())
  const [showModal, setShowModal] = useState(false)
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([])
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([])
  const [peanutShells, setPeanutShells] = useState<{ id: number; x: number; y: number }[]>([])
  const [pineconeSmoke, setPineconeSmoke] = useState<{ id: number; x: number; y: number }[]>([])
  const [isSlowMotion, setIsSlowMotion] = useState(false)
  const [showPixelSmoke, setShowPixelSmoke] = useState(false)
  const [squirrelMessage, setSquirrelMessage] = useState("I'm hungry")
  const [showSpeechBubble, setShowSpeechBubble] = useState(true)
  const [dialogType, setDialogType] = useState<"normal" | "420">("normal")
  const [isNutsBoost, setIsNutsBoost] = useState(false)
  const [playNutCrack] = useSound("/sounds/nut-crack.mp3", { volume: 0.6 })
  const [playTrapSound] = useSound("/sounds/trap-sound.mp3", { volume: 0.4 })

  // Show "I'm hungry" message periodically when idle
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSlowMotion && !isNutsBoost) {
        setSquirrelMessage("I'm hungry")
        setDialogType("normal")
        setShowSpeechBubble(true)
        setTimeout(() => setShowSpeechBubble(false), 2000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isSlowMotion, isNutsBoost])

  // Handle UFO click for x2 nuts boost - NOW 5 SECONDS
  const handleUFOClick = useCallback((x: number, y: number) => {
    setIsNutsBoost(true)
    setSquirrelMessage("NUTS X2 BOOST!")
    setDialogType("normal")
    setShowSpeechBubble(true)

    // End boost after 5 seconds
    setTimeout(() => {
      setIsNutsBoost(false)
      setShowSpeechBubble(false)
    }, 5000)
  }, [])

  const handleObjectClick = useCallback(
    (itemId: number, itemType: "acorn" | "poop" | "pinecone", x: number, y: number) => {
      // Remove the clicked item
      setFallingItems((prev) => prev.filter((item) => item.id !== itemId))

      if (itemType === "acorn") {
        // Create particle effect
        setParticles((prev) => [...prev, { id: Date.now(), x, y }])

        // Increment counter (x2 if boost is active)
        const pointsToAdd = isNutsBoost ? 2 : 1
        setCrackedCount((prev) => {
          const newCount = prev + pointsToAdd
          saveScoreToCache(newCount) // Добавить эту строку
          if (newCount >= 33) {
            setShowModal(true)
          }
          return newCount
        })

        // Show squirrel message
        if (isNutsBoost) {
          setSquirrelMessage("DOUBLE NUTS!")
        } else {
          setSquirrelMessage("YEAH! THIS IS NUT!")
        }
        setDialogType("normal")
        setShowSpeechBubble(true)
        setTimeout(() => setShowSpeechBubble(false), 1500)

        // Play crack sound
        playNutCrack()
      } else if (itemType === "poop") {
        // Poop reduces score by 1 point
        setCrackedCount((prev) => {
          const newCount = Math.max(0, prev - 1)
          saveScoreToCache(newCount) // Добавить эту строку
          return newCount
        })

        // Show squirrel message
        setSquirrelMessage("EWWW! GROSS!")
        setDialogType("normal")
        setShowSpeechBubble(true)
        setTimeout(() => setShowSpeechBubble(false), 1500)

        // Create poop effect
        setPeanutShells((prev) => [...prev, { id: Date.now(), x, y }])
      } else if (itemType === "pinecone") {
        // Reset counter
        setCrackedCount(0)
        saveScoreToCache(0) // Добавить эту строку после setCrackedCount(0)

        // Show squirrel message with standard 420 TIME dialog
        setSquirrelMessage("420 TIME")
        setDialogType("420")
        setShowSpeechBubble(true)
        setTimeout(() => setShowSpeechBubble(false), 2000)

        // Create pinecone smoke effect
        setPineconeSmoke((prev) => [...prev, { id: Date.now(), x, y }])

        // Show pixel smoke effect
        setShowPixelSmoke(true)
        playTrapSound()

        // Hide pixel smoke effect after 4 seconds
        setTimeout(() => {
          setShowPixelSmoke(false)
        }, 4000)
      }
    },
    [playNutCrack, playTrapSound, isNutsBoost],
  )

  // Generate falling items
  useEffect(() => {
    const interval = setInterval(
      () => {
        // Limit maximum items on screen
        if (fallingItems.length >= 10) return

        const rand = Math.random()
        let itemType: "acorn" | "poop" | "pinecone"

        if (rand < 0.6) {
          itemType = "acorn" // 60% acorns
        } else if (rand < 0.8) {
          itemType = "poop" // 20% poop
        } else {
          itemType = "pinecone" // 20% pinecones
        }

        const newItem: FallingItem = {
          id: Date.now() + Math.random(),
          x: Math.random() * (window.innerWidth - 80),
          y: -60,
          type: itemType,
          createdAt: Date.now(),
        }
        setFallingItems((prev) => [...prev, newItem])
      },
      isSlowMotion ? 1800 : 900,
    )

    return () => clearInterval(interval)
  }, [isSlowMotion, fallingItems.length])

  // Clean up items based on lifetime and screen position
  useEffect(() => {
    const cleanup = setInterval(() => {
      const currentTime = Date.now()
      const maxLifetime = 7000

      setFallingItems((prev) =>
        prev.filter((item) => item.y < window.innerHeight + 100 && currentTime - item.createdAt < maxLifetime),
      )
    }, 1000)

    return () => clearInterval(cleanup)
  }, [])

  // Clean up particles and effects
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      setParticles((prev) => prev.filter((particle) => Date.now() - particle.id < 2000))
      setPeanutShells((prev) => prev.filter((shell) => Date.now() - shell.id < 3000))
      setPineconeSmoke((prev) => prev.filter((smoke) => Date.now() - smoke.id < 2500))
    }, 2000)

    return () => clearInterval(cleanupInterval)
  }, [])

  // Prevent context menu on the game area
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  return (
    <main
      className="min-h-screen relative overflow-hidden cursor-none no-context-menu"
      style={{ backgroundColor: "#93C2E7" }}
      onContextMenu={handleContextMenu}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Crosshair */}
      <Crosshair />

      {/* Pixel Smoke Effect */}
      <AnimatePresence>{showPixelSmoke && <PixelSmokeEffect />}</AnimatePresence>

      {/* Nuts x2 Boost Overlay */}
      <AnimatePresence>
        {isNutsBoost && (
          <motion.div
            className="fixed inset-0 bg-green-500 bg-opacity-30 z-5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Nuts x2 Boost Indicator */}
      <AnimatePresence>
        {isNutsBoost && (
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-400 border-4 border-black rounded-none p-4 z-30 font-bold text-2xl shadow-[8px_8px_0px_#000000]"
            initial={{ scale: 0, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            🚀 NUTS X2 BOOST! 🚀
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slow Motion Overlay */}
      <AnimatePresence>
        {isSlowMotion && (
          <motion.div
            className="fixed inset-0 bg-blue-500 bg-opacity-20 z-5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Slow Motion Indicator */}
      <AnimatePresence>
        {isSlowMotion && (
          <motion.div
            className="fixed bottom-4 right-4 bg-blue-400 border-4 border-black rounded-none p-3 z-30 font-bold text-lg shadow-[4px_4px_0px_#000000] score-font"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ⏰ SLOW MOTION!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Clouds */}
      <FloatingClouds />

      {/* Flying UFO */}
      <FloatingUFO onUFOClick={handleUFOClick} />

      {/* Header */}
      <div className="w-full pt-4 px-2 relative z-10">
        {/* Full Width SVG Logo */}
        <motion.div
          className="w-full flex justify-center mb-8"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <img
            src="/squirrels-logo.svg"
            alt="Squirrels BRC2.0"
            className="w-full h-auto"
            draggable={false}
            style={{
              width: "100vw",
              maxHeight: "140px",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </motion.div>

        {/* Centered "We came for the $NUTS!" text */}
        <motion.div
          className="w-full flex justify-center mt-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div
            className="text-xl md:text-2xl text-gray-800 font-bold flex items-center gap-2"
            style={{ fontFamily: "Courier New, Monaco, Menlo, monospace" }}
          >
            <span>We came for the $NUTS!</span>
            <img
              src="/new-acorn.png"
              alt="Acorn"
              className="w-6 h-6 md:w-8 md:h-8"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Instructions in bottom right corner */}
      <motion.div
        className="fixed bottom-8 right-8 z-30 flex flex-col items-end"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* How it works button */}
        <button
          onClick={() => setShowHowItWorks(true)}
          className="flex items-center gap-3 cursor-pointer transition-all duration-200 hover:opacity-80 mb-4"
          style={{ fontFamily: "Courier New, Monaco, Menlo, monospace" }}
        >
          <span
            className="text-xl md:text-2xl text-gray-800 font-bold underline decoration-2 underline-offset-2"
            style={{ textDecorationColor: "#4B5563" }}
          >
            How it works
          </span>
          <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
            ?
          </div>
        </button>

        {/* Instructions */}
        <div
          className="text-lg md:text-xl text-gray-700 font-bold space-y-2"
          style={{ fontFamily: "Courier New, Monaco, Menlo, monospace" }}
        >
          <div className="flex items-center gap-2 justify-end">
            <span>+1 point</span>
            <img
              src="/new-acorn.png"
              alt="Acorn"
              className="w-6 h-6 md:w-8 md:h-8"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <span>-1 point</span>
            <img src="/poop.png" alt="Poop" className="w-6 h-6 md:w-8 md:h-8" style={{ imageRendering: "pixelated" }} />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <span>going to 0</span>
            <img
              src="/new-pinecone.png"
              alt="Pinecone"
              className="w-6 h-6 md:w-8 md:h-8"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <span>x2 for 5sec</span>
            <img
              src="/new-ufo.png"
              alt="UFO"
              className="w-6 h-6 md:w-8 md:h-8"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Score Display with Squirrel Character - INCREASED BY 40% */}
      <motion.div
        className="fixed bottom-8 left-0 ml-4 z-30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Squirrel Character - INCREASED BY 40% */}
        <motion.div
          className="absolute top-0 left-4 z-20 relative"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
        >
          <motion.img
            src="/new-squirrel.png"
            alt="Squirrel character"
            className="w-25 h-25 md:w-34 md:h-34" // Increased by 40% from w-18 h-18 md:w-24 md:h-24
            draggable={false}
            animate={{
              y: [0, -3, 0],
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Squirrel Dialog */}
          <SquirrelDialog message={squirrelMessage} isVisible={showSpeechBubble} type={dialogType} />
        </motion.div>

        {/* Score Display with acorn icon */}
        <div
          className="bg-yellow-400 border-4 border-black px-6 py-3 font-bold text-xl shadow-[4px_4px_0px_#000000] score-font flex items-center gap-2"
          style={{
            borderRadius: "0px",
            color: "#2E363A",
          }}
        >
          <span>Score: {crackedCount}</span>
          <img
            src="/new-acorn.png"
            alt="Acorn"
            className="w-5 h-5 md:w-6 md:h-6"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </motion.div>

      {/* Falling Objects */}
      <AnimatePresence>
        {fallingItems.map((item) => (
          <FallingObject
            key={item.id}
            id={item.id}
            initialX={item.x}
            type={item.type}
            isSlowMotion={isSlowMotion}
            onClick={(x, y, type) => handleObjectClick(item.id, type, x, y)}
          />
        ))}
      </AnimatePresence>

      {/* Particle Effects */}
      <AnimatePresence>
        {particles.map((particle) => (
          <ParticleEffect key={particle.id} x={particle.x} y={particle.y} />
        ))}
      </AnimatePresence>

      {/* Peanut Shell Effects */}
      <AnimatePresence>
        {peanutShells.map((shell) => (
          <PeanutShellEffect key={shell.id} x={shell.x} y={shell.y} />
        ))}
      </AnimatePresence>

      {/* Pinecone Smoke Effects */}
      <AnimatePresence>
        {pineconeSmoke.map((smoke) => (
          <PineconeSmokeEffect key={smoke.id} x={smoke.x} y={smoke.y} />
        ))}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>{showModal && <WalletModal onClose={() => setShowModal(false)} />}</AnimatePresence>

      <AnimatePresence>
        {showHowItWorks && <HowItWorksModal onClose={() => setShowHowItWorks(false)} />}
      </AnimatePresence>
    </main>
  )
}
