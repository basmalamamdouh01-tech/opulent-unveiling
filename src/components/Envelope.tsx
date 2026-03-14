import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import floralDecoration from "@/assets/floral-decoration.png";
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
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isRevealed && (
        <motion.section
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Background florals */}
          <img
            src={floralCorner}
            alt=""
            className="absolute top-0 left-0 w-40 md:w-64 opacity-30 pointer-events-none"
          />
          <img
            src={floralCorner}
            alt=""
            className="absolute bottom-0 right-0 w-40 md:w-64 opacity-30 pointer-events-none rotate-180"
          />
          <img
            src={floralDecoration}
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] opacity-[0.06] pointer-events-none"
          />

          {/* Envelope */}
          <motion.div
            className="relative cursor-pointer"
            style={{ perspective: 1500 }}
            onClick={!isOpen ? handleOpen : undefined}
            whileHover={!isOpen ? { scale: 1.03 } : undefined}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-[320px] h-[220px] md:w-[400px] md:h-[280px]">
              {/* Envelope body */}
              <div
                className="absolute inset-0 bg-burgundy rounded-sm"
                style={{
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  clipPath: "polygon(0 0, 50% 45%, 100% 0, 100% 100%, 0 100%)",
                }}
              />

              {/* Linen texture overlay */}
              <div className="absolute inset-0 linen-texture opacity-10 rounded-sm pointer-events-none" />

              {/* Envelope flap */}
              <motion.div
                className="absolute inset-0 bg-burgundy z-10"
                style={{
                  clipPath: "polygon(0 0, 50% 50%, 100% 0)",
                  transformOrigin: "top",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
                animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Invitation card inside */}
              <motion.div
                className="absolute top-2 left-3 right-3 bottom-2 bg-cream border border-gold-light flex flex-col items-center justify-center text-center z-[1] rounded-sm"
                style={{
                  boxShadow: "inset 0 0 40px rgba(197, 160, 89, 0.1)",
                }}
                animate={isOpen ? { y: -180 } : { y: 0 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
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

              {/* Wax seal */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 seal-gradient rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                }}
                animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <span className="font-script text-xl md:text-2xl text-primary-foreground drop-shadow-sm">
                  O&H
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Click hint */}
          <motion.p
            className="font-ui text-[10px] text-muted-foreground mt-8 tracking-[0.3em]"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
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
