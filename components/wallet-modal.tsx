"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X, Download, RotateCcw } from "lucide-react" // Changed Twitter to X, Share2 to RotateCcw

interface WalletModalProps {
  onClose: () => void
}

// Array of meme image paths
const MEME_IMAGES = [
  "/share-images/squirrel-meme-1.png",
  "/share-images/squirrel-meme-2.png",
  "/share-images/squirrel-meme-3.png",
  "/share-images/squirrel-meme-4.png",
  "/share-images/squirrel-meme-5.png",
  "/share-images/squirrel-meme-6.png",
  "/share-images/squirrel-meme-7.png",
  "/share-images/squirrel-meme-8.png",
  "/share-images/squirrel-meme-9.png",
  "/share-images/squirrel-meme-10.png",
]

const WalletModal = ({ onClose }: WalletModalProps) => {
  const [walletAddress, setWalletAddress] = useState("")
  const [twitterUsername, setTwitterUsername] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [randomImage, setRandomImage] = useState<number>(0)
  const [selectedMemeIndex, setSelectedMemeIndex] = useState<number>(0)
  const [shared, setShared] = useState(false)

  // Select a random meme image and squirrel when component mounts
  useEffect(() => {
    setRandomImage(Math.floor(Math.random() * 6) + 1) // Random number between 1-6
    setSelectedMemeIndex(Math.floor(Math.random() * MEME_IMAGES.length)) // Random meme image
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (walletAddress.trim() && twitterUsername.trim()) {
      setSubmitted(true)
      console.log("Submitted:", { wallet: walletAddress, twitter: twitterUsername })
    }
  }

  // Function to download the selected meme image
  const downloadMemeImage = async () => {
    try {
      const response = await fetch(MEME_IMAGES[selectedMemeIndex])
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `squirrel-meme-${selectedMemeIndex + 1}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading image:", error)
    }
  }

  const handleTwitterShare = () => {
    // Create a URL for the current website
    const siteUrl = window.location.origin

    // Create the tweet text with the Twitter username - UPDATED TO 33
    const tweetText = encodeURIComponent(
      `I cracked 33 nuts on Squirrels BRC 2.0 🐿 and joined the WL raffle as ${twitterUsername}!\n\nTry it too 👉 ${siteUrl}\n\n#SquirrelsBRC2 #BRC20 #NFT #Bitcoin`,
    )

    // First download the image, then open Twitter
    downloadMemeImage()

    // Small delay to ensure download starts before opening Twitter
    setTimeout(() => {
      window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank")
      setShared(true) // Show close button after sharing
    }, 500)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        className="bg-white border-8 border-black shadow-[12px_12px_0px_#000000] max-w-md w-full my-8 max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.3, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="bg-green-400 border-b-8 border-black p-3 relative">
          <button
            onClick={onClose}
            className="absolute top-1 right-1 text-black hover:bg-red-400 p-2 border-4 border-black bg-white transition-colors cursor-pointer"
            style={{ minWidth: "40px", minHeight: "40px" }}
          >
            <X size={20} />
          </button>
          <motion.h2
            className="text-lg font-bold text-black text-center pr-16"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
            }}
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            🎉 Congrats! You're eligible to join the raffle! 🎉
          </motion.h2>
        </div>

        <div className="p-6">
          {!submitted ? (
            <>
              <div className="mb-6 text-center">
                <motion.div
                  className="mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2.5,
                  }}
                >
                  <img
                    src={`/squirrel${randomImage}.png`}
                    alt="Squirrel NFT"
                    className="w-24 h-24 mx-auto"
                    style={{ imageRendering: "pixelated" }}
                  />
                </motion.div>
                <p className="text-black font-bold text-lg" style={{ fontFamily: "Arial, sans-serif" }}>
                  You cracked 33 nuts! Enter your details to join the raffle:
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label
                    htmlFor="wallet"
                    className="block mb-2 font-bold text-black"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    Taproot Wallet
                  </Label>
                  <input
                    id="wallet"
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full border-4 border-black rounded-none bg-white p-3 text-black font-mono text-sm focus:outline-none focus:border-blue-500"
                    placeholder="bc1p..."
                    required
                    style={{
                      fontFamily: "Courier New, monospace",
                      color: "#000000",
                    }}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="twitter"
                    className="block mb-2 font-bold text-black"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    Twitter @username
                  </Label>
                  <input
                    id="twitter"
                    type="text"
                    value={twitterUsername}
                    onChange={(e) => setTwitterUsername(e.target.value)}
                    className="w-full border-4 border-black rounded-none bg-white p-3 text-black font-mono text-sm focus:outline-none focus:border-blue-500"
                    placeholder="@yourusername"
                    required
                    style={{
                      fontFamily: "Courier New, monospace",
                      color: "#000000",
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold border-4 border-black rounded-none shadow-[4px_4px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] hover:translate-x-1 hover:translate-y-1 transition-all text-lg p-4"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Submit
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 360] }}
                transition={{ duration: 1.5 }}
                className="text-7xl mb-4"
              >
                🎯
              </motion.div>
              <h3 className="text-3xl font-bold mb-3 text-black" style={{ fontFamily: "Arial, sans-serif" }}>
                Almost in WL!
              </h3>
              <p className="text-black mb-4 text-lg" style={{ fontFamily: "Arial, sans-serif" }}>
                You're almost in the WL raffle! Just share this post on Twitter with our image and you're in!
              </p>

              {/* Display the selected meme image */}
              <div className="mb-6 border-4 border-black p-2 bg-gray-100">
                <motion.img
                  src={MEME_IMAGES[selectedMemeIndex]}
                  alt="Squirrels BRC2 Meme"
                  className="w-full h-auto"
                  style={{ imageRendering: "pixelated" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                />
                <p className="text-xs text-gray-600 mt-2" style={{ fontFamily: "Arial, sans-serif" }}>
                  This image will be downloaded and ready to attach to your tweet
                </p>
              </div>

              <div className="space-y-4">
                {!shared ? (
                  <Button
                    onClick={handleTwitterShare}
                    className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold border-4 border-black rounded-none shadow-[4px_4px_0px_#000000] text-lg px-6 py-3 flex items-center justify-center gap-2"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    <X size={20} />
                    Share on X + Download Image
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-green-100 border-4 border-green-500 p-4 text-center">
                      <p className="text-green-800 font-bold text-lg" style={{ fontFamily: "Arial, sans-serif" }}>
                        🎉 Congratulations! You're now in the whitelist raffle! 🎉
                      </p>
                      <p className="text-green-700 text-sm mt-2" style={{ fontFamily: "Arial, sans-serif" }}>
                        You can continue playing to increase your score!
                      </p>
                    </div>

                    <Button
                      onClick={onClose}
                      className="w-full bg-green-400 hover:bg-green-500 text-black font-bold border-4 border-black rounded-none shadow-[4px_4px_0px_#000000] text-lg px-6 py-3"
                      style={{ fontFamily: "Arial, sans-serif" }}
                    >
                      ✅ Continue Playing!
                    </Button>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedMemeIndex((prev) => (prev + 1) % MEME_IMAGES.length)}
                    className="flex-1 bg-purple-400 hover:bg-purple-500 text-white font-bold border-4 border-black rounded-none shadow-[4px_4px_0px_#000000] text-sm px-3 py-2 flex items-center justify-center gap-1"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    <RotateCcw size={16} />
                    Change Image
                  </Button>

                  <Button
                    onClick={downloadMemeImage}
                    className="flex-1 bg-orange-400 hover:bg-orange-500 text-white font-bold border-4 border-black rounded-none shadow-[4px_4px_0px_#000000] text-sm px-3 py-2 flex items-center justify-center gap-1"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    <Download size={16} />
                    Download
                  </Button>
                </div>

                {!shared && (
                  <Button
                    onClick={onClose}
                    className="w-full bg-gray-400 hover:bg-gray-500 text-black font-bold border-4 border-black rounded-none shadow-[4px_4px_0px_#000000] text-sm px-3 py-2"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    Close
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default WalletModal
