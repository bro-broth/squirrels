"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface HowItWorksModalProps {
  onClose: () => void
}

const HowItWorksModal = ({ onClose }: HowItWorksModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white border-8 border-black shadow-[12px_12px_0px_#000000] max-w-md w-full"
        initial={{ scale: 0.3, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="bg-blue-500 border-b-8 border-black p-4 relative">
          <button
            onClick={onClose}
            className="absolute top-1 right-1 text-white hover:bg-red-400 p-2 border-4 border-black bg-blue-700 transition-colors cursor-pointer"
            style={{ minWidth: "40px", minHeight: "40px" }}
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-bold text-white text-center pr-16 title-font">HOW IT WORKS</h2>
        </div>

        <div className="p-6" style={{ fontFamily: "Arial, sans-serif" }}>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-400 text-black border-4 border-black rounded-none flex items-center justify-center font-bold text-lg shadow-[2px_2px_0px_#000000]">
                1
              </div>
              <div>
                <h3 className="font-bold text-black text-lg">Click the falling acorns</h3>
                <p className="text-gray-700 text-sm">
                  Use your crosshair to aim and click on the acorns as they fall from the sky
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-400 text-black border-4 border-black rounded-none flex items-center justify-center font-bold text-lg shadow-[2px_2px_0px_#000000]">
                2
              </div>
              <div>
                <h3 className="font-bold text-black text-lg">Reach 33 points</h3>
                <p className="text-gray-700 text-sm">Each acorn you crack gives you 1 point. Get to 33 to win!</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-400 text-black border-4 border-black rounded-none flex items-center justify-center font-bold text-lg shadow-[2px_2px_0px_#000000]">
                3
              </div>
              <div>
                <h3 className="font-bold text-black text-lg">Join the raffle</h3>
                <p className="text-gray-700 text-sm">Once you reach 33 points, you can enter the whitelist raffle</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-400 text-black border-4 border-black rounded-none flex items-center justify-center font-bold text-lg shadow-[2px_2px_0px_#000000]">
                4
              </div>
              <div>
                <h3 className="font-bold text-black text-lg">Share on Twitter</h3>
                <p className="text-gray-700 text-sm">Share your achievement on Twitter to complete your entry</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-100 border-4 border-black shadow-[4px_4px_0px_#000000]">
            <p className="text-sm text-black font-bold">
              <strong>⚠️ Watch out:</strong> Avoid poop (-1 point) and pinecones (reset score)! Catch the UFO for x2 nuts
              bonus!
            </p>
          </div>

          <Button
            onClick={onClose}
            className="w-full mt-6 bg-green-400 hover:bg-green-500 text-black font-bold py-4 border-4 border-black rounded-none shadow-[4px_4px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] hover:translate-x-1 hover:translate-y-1 transition-all text-lg cursor-pointer"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Got it, let's play!
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default HowItWorksModal
