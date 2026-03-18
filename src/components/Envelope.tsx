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
          style={{
            background: `
              radial-gradient(ellipse at 50% 50%, hsl(37, 25%, 86%) 0%, hsl(35, 20%, 78%) 100%)
            `,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Vintage paper texture overlay */}
          <div
            className="absolute inset-0 opacity-40 linen-texture pointer-events-none"
          />
          {/* Aged vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(60, 40, 20, 0.15) 100%)",
            }}
          />
          {/* Subtle stain spots for aged look */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "200px", height: "200px",
              top: "15%", left: "10%",
              background: "radial-gradient(circle, rgba(120, 90, 50, 0.06) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              width: "150px", height: "150px",
              bottom: "20%", right: "15%",
              background: "radial-gradient(circle, rgba(100, 70, 40, 0.05) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />

          {/* Background florals — more faded/vintage */}
          <img src={floralCorner} alt="" className="absolute top-0 left-0 w-40 md:w-64 opacity-10 pointer-events-none sepia" style={{ filter: "sepia(0.4) opacity(0.12)" }} />
          <img src={floralCorner} alt="" className="absolute bottom-0 right-0 w-40 md:w-64 opacity-10 pointer-events-none rotate-180" style={{ filter: "sepia(0.4) opacity(0.12)" }} />

          {/* Top text */}
          <motion.div
            className="text-center mb-6 z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="font-ui text-[11px] md:text-xs tracking-[0.35em]" style={{ color: "hsl(350, 40%, 30%)" }}>
              YOU ARE INVITED TO
            </p>
            <h1 className="font-script text-4xl md:text-6xl leading-tight" style={{ color: "hsl(350, 50%, 25%)" }}>
              Hazem & Ola
            </h1>
            <p className="font-ui text-[10px] md:text-[11px] tracking-[0.3em] mt-1" style={{ color: "hsl(350, 30%, 40%)" }}>
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
              {/* Envelope body — aged cream paper */}
              <div
                className="absolute inset-0 rounded-[3px]"
                style={{
                  background: `
                    linear-gradient(175deg, 
                      hsl(38, 32%, 90%) 0%, 
                      hsl(36, 28%, 86%) 30%, 
                      hsl(34, 24%, 82%) 70%, 
                      hsl(32, 20%, 78%) 100%
                    )
                  `,
                  boxShadow: "0 30px 80px rgba(40, 25, 10, 0.22), 0 10px 30px rgba(40, 25, 10, 0.12), 0 2px 8px rgba(0,0,0,0.08)",
                }}
              />

              {/* Aged paper texture */}
              <div className="absolute inset-0 rounded-[3px] opacity-50 linen-texture" />

              {/* Yellowed aging effect */}
              <div
                className="absolute inset-0 rounded-[3px]"
                style={{
                  background: `
                    radial-gradient(ellipse at 30% 70%, rgba(140, 110, 60, 0.08) 0%, transparent 50%),
                    radial-gradient(ellipse at 80% 20%, rgba(120, 90, 50, 0.06) 0%, transparent 40%)
                  `,
                }}
              />

              {/* Edge darkening — aged paper look */}
              <div
                className="absolute inset-0 rounded-[3px]"
                style={{
                  boxShadow: "inset 0 0 30px rgba(80, 50, 20, 0.1), inset 0 0 60px rgba(60, 40, 15, 0.05)",
                }}
              />

              {/* Diagonal fold lines */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, transparent 48%, rgba(0,0,0,0.05) 49.5%, transparent 51%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(-135deg, transparent 48%, rgba(0,0,0,0.05) 49.5%, transparent 51%)" }} />

              {/* Bottom fold */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[50%]"
                style={{
                  background: "linear-gradient(0deg, hsl(34, 22%, 80%) 0%, transparent 100%)",
                  clipPath: "polygon(0 100%, 0 30%, 50% 85%, 100% 30%, 100% 100%)",
                  opacity: 0.4,
                }}
              />

              {/* Top flap (opens) */}
              <motion.div
                className="absolute inset-0 z-10 rounded-t-[3px]"
                style={{
                  background: `linear-gradient(180deg, 
                    hsl(37, 30%, 89%) 0%, 
                    hsl(35, 26%, 85%) 40%,
                    hsl(33, 22%, 82%) 100%
                  )`,
                  clipPath: "polygon(0 0, 50% 50%, 100% 0)",
                  transformOrigin: "top",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.06))",
                }}
                animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />

              {/* Fold lines SVG */}
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              >
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="200" y2="140" stroke="rgba(80,50,20,0.08)" strokeWidth="0.8" />
                  <line x1="400" y1="0" x2="200" y2="140" stroke="rgba(80,50,20,0.08)" strokeWidth="0.8" />
                </svg>
              </motion.div>

              {/* Invitation card inside */}
              <motion.div
                className="absolute top-5 left-6 right-6 bottom-5 flex flex-col items-center justify-center text-center z-[1] rounded-sm"
                style={{
                  background: "linear-gradient(180deg, hsl(40, 30%, 95%) 0%, hsl(38, 26%, 92%) 100%)",
                  border: "1px solid hsl(38, 25%, 82%)",
                  boxShadow: "inset 0 0 30px rgba(160, 130, 70, 0.06), 0 1px 4px rgba(0,0,0,0.05)",
                }}
                animate={isOpen ? { y: -220, opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
              >
                <span className="font-ui text-[9px] md:text-[10px] mb-2 text-gold tracking-[0.25em]">
                  SAVE THE DATE
                </span>
                <h2 className="font-script text-2xl md:text-4xl text-burgundy mb-1">
                  Hazem & Ola
                </h2>
                <div className="w-10 h-[1px] bg-gold/50 my-2" />
                <p className="font-serif-elegant text-[11px] md:text-sm italic text-foreground/60">
                  April 2, 2026
                </p>
              </motion.div>

              {/* Wax seal — centered properly */}
              <motion.div
                className="absolute z-20 flex items-center justify-center cursor-pointer"
                style={{
                  width: "clamp(72px, 20vw, 96px)",
                  height: "clamp(72px, 20vw, 96px)",
                  top: "50%",
                  left: "50%",
                  marginTop: "calc(-1 * clamp(36px, 10vw, 48px))",
                  marginLeft: "calc(-1 * clamp(36px, 10vw, 48px))",
                }}
                animate={isOpen ? { opacity: 0, scale: 0, rotate: 45 } : { opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.08 }}
              >
                {/* Outer wax — irregular aged look */}
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: "-4px",
                    background: `radial-gradient(circle at 35% 32%, 
                      hsl(348, 48%, 50%) 0%, 
                      hsl(350, 55%, 38%) 30%, 
                      hsl(350, 60%, 30%) 55%,
                      hsl(350, 65%, 22%) 100%
                    )`,
                    boxShadow: `
                      0 8px 30px rgba(80, 15, 25, 0.55),
                      0 3px 10px rgba(0,0,0,0.3),
                      inset 0 3px 8px rgba(255,255,255,0.12),
                      inset 0 -4px 10px rgba(0,0,0,0.3)
                    `,
                    borderRadius: "48% 52% 50% 50% / 50% 48% 52% 50%",
                  }}
                />
                {/* Wax ring detail */}
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: "8px",
                    border: "1.5px solid rgba(255,255,255,0.07)",
                  }}
                />
                {/* Inner pressed area */}
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: "14px",
                    background: `radial-gradient(circle at 42% 40%, 
                      hsl(348, 46%, 44%) 0%, 
                      hsl(350, 52%, 35%) 50%,
                      hsl(350, 58%, 27%) 100%
                    )`,
                    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.25), inset 0 -1px 4px rgba(255,255,255,0.05)",
                  }}
                />
                {/* Initials — embossed */}
                <span
                  className="relative z-10 font-serif-elegant font-semibold"
                  style={{
                    fontSize: "clamp(13px, 3.5vw, 17px)",
                    color: "hsl(348, 38%, 52%)",
                    textShadow: "0 -1px 2px rgba(0,0,0,0.35), 0 1px 1px rgba(255,255,255,0.08)",
                    letterSpacing: "0.15em",
                  }}
                >
                  H & O
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom text — vintage feel */}
          <motion.div
            className="text-center mt-8 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <p className="font-serif-elegant text-sm md:text-base italic" style={{ color: "hsl(350, 25%, 40%)" }}>
              The first chapter of forever
            </p>
            <p className="font-serif-elegant text-base md:text-lg font-semibold mt-1" style={{ color: "hsl(350, 45%, 28%)" }}>
              begins with you.
            </p>
          </motion.div>

          {/* Tap hint */}
          <motion.p
            className="font-ui text-[9px] mt-6 tracking-[0.3em] z-10"
            style={{ color: "hsl(350, 20%, 50%)" }}
            animate={{ opacity: [0.15, 0.6, 0.15] }}
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
