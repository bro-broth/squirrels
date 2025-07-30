"use client"

import { motion } from "framer-motion"

const SquirrelGrid = () => {
  const squirrels = [
    {
      id: 1,
      image: "/squirrel1.png",
      caption: "Pride Squirrel 🏳️‍🌈",
    },
    {
      id: 2,
      image: "/squirrel2.png",
      caption: "BRC Maxi 💎",
    },
    {
      id: 3,
      image: "/squirrel3.png",
      caption: "Rainbow Warrior 🌈",
    },
    {
      id: 4,
      image: "/squirrel4.png",
      caption: "Pope Squirrel ⛪",
    },
    {
      id: 5,
      image: "/squirrel5.png",
      caption: "Chill Vibes 😎",
    },
    {
      id: 6,
      image: "/squirrel6.png",
      caption: "Holy Nuts 🙏",
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
      {squirrels.map((squirrel, index) => (
        <motion.div
          key={squirrel.id}
          className="bg-white border-4 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          style={{ imageRendering: "pixelated" }}
        >
          <div className="aspect-square bg-white flex items-center justify-center p-2">
            <img
              src={squirrel.image || "/placeholder.svg"}
              alt={`Squirrel NFT #${squirrel.id}`}
              className="w-full h-full object-contain"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <div className="bg-yellow-300 p-2 border-t-4 border-black">
            <p className="text-center font-bold text-black pixel-font text-xs md:text-sm">{squirrel.caption}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default SquirrelGrid
