"use client"

import { motion } from "framer-motion"

const NFTGrid = () => {
  // Array of 8 placeholder squirrel NFTs
  const nfts = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    image: `/placeholder.svg?height=300&width=300&query=pixel art squirrel nft ${i + 1} colorful meme style`,
  }))

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {nfts.map((nft, index) => (
        <motion.div
          key={nft.id}
          className="rounded-lg overflow-hidden border-4 border-yellow-300 shadow-lg hover:scale-105 transition-transform"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <img src={nft.image || "/placeholder.svg"} alt={`Squirrel NFT #${nft.id}`} className="w-full h-auto" />
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2">
            <p className="text-center font-bold text-white">Squirrel #{nft.id}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default NFTGrid
