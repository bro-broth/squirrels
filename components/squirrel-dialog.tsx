"use client"

import { motion, AnimatePresence } from "framer-motion"

interface SquirrelDialogProps {
  message: string
  isVisible: boolean
  type?: "normal" | "420" // Keep type for potential future use
}

const SquirrelDialog = ({ message, isVisible, type = "normal" }: SquirrelDialogProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute -top-20 right-2 z-30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Standard dialog bubble for all messages */}
          <div className="relative bg-white border-4 border-black px-4 py-2 rounded-lg shadow-[4px_4px_0px_#000000]">
            <p className="text-black font-bold text-sm whitespace-nowrap" style={{ fontFamily: "Arial, sans-serif" }}>
              {message}
            </p>

            {/* Standard dialog bubble tail pointing down-left to squirrel */}
            <div className="absolute -bottom-3 left-4 w-0 h-0">
              <div className="absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SquirrelDialog
