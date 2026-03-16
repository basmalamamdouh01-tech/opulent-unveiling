import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          style={{ background: "linear-gradient(180deg, hsl(35, 25%, 88%) 0%, hsl(38, 22%, 82%) 100%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Background florals */}
          <img src={floralCorner} alt="" className="absolute top-0 left-0 w-40 md:w-64 opacity-15 pointer-events-none" />
          <img src={floralCorner} alt="" className="absolute bottom-0 right-0 w-40 md:w-64 opacity-15 pointer-events-none rotate-180" />

          {/* Top text */}
          <motion.div
            className="text-center mb-6 z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="font-ui text-[11px] md:text-xs tracking-[0.35em] text-burgundy/70 mb-1">
              YOU ARE INVITED TO
            </p>
            <h1 className="font-script text-4xl md:text-6xl text-burgundy leading-tight">
              Ola & Hazem
            </h1>
            <p className="font-ui text-[10px] md:text-[11px] tracking-[0.3em] text-burgundy/50 mt-1">
              WEDDING CELEBRATION
            </p>
          </motion.div>

          {/* Envelope container */}
          <motion.div
            className="relative cursor-pointer"
            style={{ perspective: 1200 }}
            onClick={!isOpen ? handleOpen : undefined}
            whileHover={!isOpen ? { scale: 1.02 } : undefined}
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            <div className="relative w-[300px] h-[220px] md:w-[400px] md:h-[280px]">
              {/* Envelope body — realistic cream paper */}
              <div
                className="absolute inset-0 rounded-[3px]"
                style={{
                  background: `
                    linear-gradient(175deg, 
                      hsl(37, 30%, 93%) 0%, 
                      hsl(36, 28%, 90%) 30%, 
                      hsl(35, 25%, 87%) 60%, 
                      hsl(34, 22%, 84%) 100%
                    )
                  `,
                  boxShadow: "0 30px 80px rgba(0,0,0,0.18), 0 10px 30px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)",
                }}
              />

              {/* Paper texture overlay */}
              <div
                className="absolute inset-0 rounded-[3px] opacity-30 linen-texture"
              />

              {/* Diagonal fold line — top-left to center */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, transparent 48%, rgba(0,0,0,0.04) 49%, rgba(0,0,0,0.04) 50%, transparent 51%)",
                }}
              />

              {/* Diagonal fold line — top-right to center */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(-135deg, transparent 48%, rgba(0,0,0,0.04) 49%, rgba(0,0,0,0.04) 50%, transparent 51%)",
                }}
              />

              {/* Bottom fold shadow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[50%]"
                style={{
                  background: "linear-gradient(0deg, hsl(35, 24%, 86%) 0%, transparent 100%)",
                  clipPath: "polygon(0 100%, 0 30%, 50% 85%, 100% 30%, 100% 100%)",
                  opacity: 0.5,
                }}
              />

              {/* Top flap (opens) */}
              <motion.div
                className="absolute inset-0 z-10 rounded-t-[3px]"
                style={{
                  background: `linear-gradient(180deg, 
                    hsl(36, 30%, 92%) 0%, 
                    hsl(35, 26%, 88%) 40%,
                    hsl(34, 24%, 86%) 100%
                  )`,
                  clipPath: "polygon(0 0, 50% 50%, 100% 0)",
                  transformOrigin: "top",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.05))",
                }}
                animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />

              {/* Fold line on top flap */}
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: "transparent",
                  borderTop: "none",
                }}
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              >
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="200" y2="140" stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" />
                  <line x1="400" y1="0" x2="200" y2="140" stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" />
                </svg>
              </motion.div>

              {/* Invitation card inside */}
              <motion.div
                className="absolute top-5 left-6 right-6 bottom-5 flex flex-col items-center justify-center text-center z-[1] rounded-sm"
                style={{
                  background: "linear-gradient(180deg, hsl(40, 33%, 97%) 0%, hsl(38, 30%, 95%) 100%)",
                  border: "1px solid hsl(42, 30%, 85%)",
                  boxShadow: "inset 0 0 30px rgba(197, 160, 89, 0.08), 0 1px 4px rgba(0,0,0,0.06)",
                }}
                animate={isOpen ? { y: -220, opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
              >
                <span className="font-ui text-[9px] md:text-[10px] mb-2 text-gold tracking-[0.25em]">
                  SAVE THE DATE
                </span>
                <h2 className="font-script text-2xl md:text-4xl text-burgundy mb-1">
                  Ola & Hazem
                </h2>
                <div className="w-10 h-[1px] bg-gold/50 my-2" />
                <p className="font-serif-elegant text-[11px] md:text-sm italic text-foreground/60">
                  April 2, 2026
                </p>
              </motion.div>

              {/* Wax seal — realistic burgundy like reference */}
              <motion.div
                className="absolute z-20 flex items-center justify-center cursor-pointer"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "clamp(72px, 20vw, 96px)",
                  height: "clamp(72px, 20vw, 96px)",
                }}
                animate={isOpen ? { opacity: 0, scale: 0, rotate: 45 } : { opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.08 }}
              >
                {/* Outer wax blob — irregular edges */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 38% 35%, 
                      hsl(348, 50%, 48%) 0%, 
                      hsl(350, 55%, 38%) 35%, 
                      hsl(350, 60%, 30%) 60%,
                      hsl(350, 65%, 24%) 100%
                    )`,
                    boxShadow: `
                      0 6px 25px rgba(80, 20, 30, 0.5),
                      0 2px 8px rgba(0,0,0,0.3),
                      inset 0 2px 6px rgba(255,255,255,0.12),
                      inset 0 -3px 8px rgba(0,0,0,0.25)
                    `,
                  }}
                />
                {/* Wax drip texture — subtle ring */}
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: "6px",
                    border: "1.5px solid rgba(255,255,255,0.08)",
                    borderRadius: "50%",
                  }}
                />
                {/* Inner pressed circle */}
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: "12px",
                    background: `radial-gradient(circle at 40% 38%, 
                      hsl(348, 48%, 42%) 0%, 
                      hsl(350, 55%, 34%) 50%,
                      hsl(350, 58%, 28%) 100%
                    )`,
                    boxShadow: "inset 0 2px 8px rgba(0,0,0,0.2), inset 0 -1px 3px rgba(255,255,255,0.06)",
                  }}
                />
                {/* Initials — embossed look */}
                <span
                  className="relative z-10 font-serif-elegant font-semibold tracking-[0.15em]"
                  style={{
                    fontSize: "clamp(14px, 4vw, 18px)",
                    color: "hsl(348, 40%, 55%)",
                    textShadow: "0 -1px 1px rgba(0,0,0,0.3), 0 1px 1px rgba(255,255,255,0.1)",
                    letterSpacing: "0.15em",
                  }}
                >
                  O & H
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom text */}
          <motion.div
            className="text-center mt-8 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <p className="font-serif-elegant text-sm md:text-base text-burgundy/60 italic">
              The first chapter of forever
            </p>
            <p className="font-serif-elegant text-base md:text-lg text-burgundy font-semibold mt-1">
              begins with you.
            </p>
          </motion.div>

          {/* Tap hint */}
          <motion.p
            className="font-ui text-[9px] text-burgundy/40 mt-6 tracking-[0.3em] z-10"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {isOpen ? "" : "TAP TO OPEN"}
          </motion.p>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Envelope;
