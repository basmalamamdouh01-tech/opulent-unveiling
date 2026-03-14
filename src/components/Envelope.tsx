import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import envelopeBg from "@/assets/envelope-bg.png";
import floralCorner from "@/assets/floral-corner.png";

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope = ({ onOpen }: EnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsRevealed(true);
      setTimeout(() => onOpen(), 1200);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isRevealed && (
        <motion.section
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "hsl(40, 33%, 94%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Background florals */}
          <img
            src={floralCorner}
            alt=""
            className="absolute top-0 left-0 w-40 md:w-64 opacity-20 pointer-events-none"
          />
          <img
            src={floralCorner}
            alt=""
            className="absolute bottom-0 right-0 w-40 md:w-64 opacity-20 pointer-events-none rotate-180"
          />

          {/* Envelope container */}
          <motion.div
            className="relative cursor-pointer"
            style={{ perspective: 1200 }}
            onClick={!isOpen ? handleOpen : undefined}
            whileHover={!isOpen ? { scale: 1.03 } : undefined}
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative w-[320px] h-[230px] md:w-[420px] md:h-[300px]">
              {/* Envelope body — cream with shadow */}
              <div
                className="absolute inset-0 rounded-md overflow-hidden"
                style={{
                  background: "linear-gradient(175deg, hsl(35, 30%, 92%) 0%, hsl(38, 28%, 88%) 50%, hsl(35, 25%, 85%) 100%)",
                  boxShadow: "0 25px 70px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.1)",
                }}
              />

              {/* Burgundy inner liner visible behind flap */}
              <div
                className="absolute inset-0 rounded-md bg-burgundy"
                style={{
                  clipPath: "polygon(0 0, 50% 42%, 100% 0, 100% 8%, 50% 48%, 0 8%)",
                  opacity: 0.6,
                }}
              />

              {/* Bottom flap fold lines */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[45%] rounded-b-md"
                style={{
                  background: "linear-gradient(0deg, hsl(35, 28%, 89%) 0%, hsl(35, 26%, 86%) 100%)",
                  clipPath: "polygon(0 100%, 0 20%, 50% 80%, 100% 20%, 100% 100%)",
                  boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
                }}
              />

              {/* Left flap fold */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, hsl(35, 26%, 87%) 0%, transparent 40%)",
                  clipPath: "polygon(0 0, 50% 45%, 0 100%)",
                  opacity: 0.7,
                }}
              />

              {/* Right flap fold */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(-90deg, hsl(35, 26%, 87%) 0%, transparent 40%)",
                  clipPath: "polygon(100% 0, 50% 45%, 100% 100%)",
                  opacity: 0.7,
                }}
              />

              {/* Top flap (opens) */}
              <motion.div
                className="absolute inset-0 z-10"
                style={{
                  background: "linear-gradient(180deg, hsl(35, 30%, 91%) 0%, hsl(35, 28%, 87%) 100%)",
                  clipPath: "polygon(0 0, 50% 48%, 100% 0)",
                  transformOrigin: "top",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                }}
                animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />

              {/* Invitation card inside */}
              <motion.div
                className="absolute top-4 left-5 right-5 bottom-4 bg-cream border border-gold-light flex flex-col items-center justify-center text-center z-[1] rounded-sm"
                style={{
                  boxShadow: "inset 0 0 40px rgba(197, 160, 89, 0.1), 0 2px 8px rgba(0,0,0,0.08)",
                }}
                animate={isOpen ? { y: -200 } : { y: 0 }}
                transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
              >
                <span className="font-ui text-[10px] md:text-xs mb-2 text-gold tracking-[0.2em]">
                  SAVE THE DATE
                </span>
                <h1 className="font-script text-3xl md:text-5xl text-burgundy mb-1">
                  Ola & Hazem
                </h1>
                <div className="w-12 h-[1px] bg-gold my-2" />
                <p className="font-serif-elegant text-xs md:text-sm italic text-foreground/70">
                  April 2, 2026
                </p>
              </motion.div>

              {/* Wax seal — burgundy/pink with gold ring */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  background: "radial-gradient(circle at 35% 35%, hsl(340, 45%, 60%), hsl(350, 50%, 45%), hsl(350, 55%, 35%))",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.35), inset 0 -2px 6px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.15), 0 0 0 3px hsl(42, 52%, 56%)",
                }}
                animate={isOpen ? { opacity: 0, scale: 0, rotate: 90 } : { opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
              >
                <span className="font-script text-2xl md:text-3xl text-white drop-shadow-sm" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
                  O&H
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Click hint with gold accent */}
          <motion.p
            className="font-ui text-[10px] text-gold mt-8 tracking-[0.3em]"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isOpen ? "" : "TAP TO OPEN"}
          </motion.p>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Envelope;
