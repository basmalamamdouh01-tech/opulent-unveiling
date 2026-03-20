import { motion } from "framer-motion";
import { Play } from "lucide-react";
import directionsMap from "@/assets/grove-directions.jpg";

const DirectionsSection = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <h3 className="font-script text-4xl md:text-5xl text-burgundy text-center mb-4">
          How to Get There
        </h3>
        <p className="font-ui text-[10px] md:text-xs text-muted-foreground tracking-[0.2em] text-center mb-10">
          DIRECTIONAL MAP TO THE GROVE
        </p>
        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-background bg-white">
          <img
            src={directionsMap}
            alt="Directions to The Grove venue - via Ring Road and Suez Road"
            className="w-full h-auto"
          />
        </div>
        <div className="text-center mt-8">
          <a
            href="https://drive.google.com/file/d/16PYg03xfNZajbgDGEEONxen31hSfrhNU/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 bg-gold/5 hover:bg-gold/15 transition-colors font-ui text-xs tracking-[0.15em] text-foreground/70 hover:text-gold"
          >
            <Play className="w-4 h-4" />
            WATCH DIRECTIONS VIDEO
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default DirectionsSection;
