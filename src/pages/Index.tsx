import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "@/components/Envelope";
import CoupleSection from "@/components/CoupleSection";
import DetailsSection from "@/components/DetailsSection";
import MapSection from "@/components/MapSection";
import MusicToggle from "@/components/MusicToggle";
import BirdsSVG from "@/components/BirdsSVG";
import FloatingPetals from "@/components/FloatingPetals";
import floralDecoration from "@/assets/floral-decoration.png";
import floralCorner from "@/assets/floral-corner.png";

const Index = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      {/* Envelope overlay */}
      <Envelope onOpen={() => setIsEnvelopeOpen(true)} />

      {/* Main content after envelope opens */}
      <AnimatePresence>
        {isEnvelopeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* Birds animation */}
            <BirdsSVG />

            {/* Floating petals */}
            <FloatingPetals />

            {/* Music toggle */}
            <MusicToggle autoPlay={isEnvelopeOpen} />

            {/* Background floral watermark */}
            <div className="fixed inset-0 pointer-events-none z-0">
              <img
                src={floralDecoration}
                alt=""
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] opacity-[0.04]"
              />
            </div>

            {/* Hero / Landing */}
            <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
              {/* Corner florals */}
              <motion.img
                src={floralCorner}
                alt=""
                className="absolute top-0 left-0 w-48 md:w-72 opacity-80 pointer-events-none"
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 0.8, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />
              <motion.img
                src={floralCorner}
                alt=""
                className="absolute bottom-0 right-0 w-48 md:w-72 opacity-80 pointer-events-none rotate-180"
                initial={{ opacity: 0, scale: 0.5, rotate: 200 }}
                animate={{ opacity: 0.8, scale: 1, rotate: 180 }}
                transition={{ duration: 1.5, delay: 0.4 }}
              />

              {/* Sparkle dots */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-gold"
                  style={{
                    left: `${15 + i * 14}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <p className="font-ui text-[10px] md:text-xs text-gold tracking-[0.3em] mb-4">
                  YOU ARE CORDIALLY INVITED TO THE WEDDING OF
                </p>
              </motion.div>
              <motion.h1
                className="font-script text-6xl md:text-8xl lg:text-9xl text-burgundy mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              >
                Ola & Hazem
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="h-[1px] bg-gold mx-auto mb-4"
              />
              <motion.p
                className="font-serif-elegant text-lg md:text-2xl italic text-foreground/70"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                Are getting married
              </motion.p>
              <motion.p
                className="font-ui text-[10px] text-muted-foreground mt-6 tracking-[0.2em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                APRIL 2, 2026 • CAIRO, EGYPT
              </motion.p>

              {/* Scroll indicator */}
              <motion.div
                className="absolute bottom-10 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
              >
                <span className="font-ui text-[9px] text-muted-foreground tracking-[0.2em] mb-2">
                  SCROLL TO EXPLORE
                </span>
                <motion.div
                  className="w-[1px] h-10 bg-gold/40"
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ transformOrigin: "top" }}
                />
              </motion.div>
            </section>

            {/* Couple Section */}
            <CoupleSection />

            {/* Details Section */}
            <DetailsSection />

            {/* Map Section */}
            <MapSection />

            {/* Footer */}
            <footer className="py-16 md:py-20 text-center opacity-50">
              <p className="font-script text-2xl md:text-3xl text-burgundy">Ola & Hazem</p>
              <p className="font-ui text-[10px] mt-4 text-muted-foreground tracking-[0.2em]">
                2026 • DESIGNED WITH LOVE
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
