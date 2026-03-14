import { motion } from "framer-motion";
import couplePhoto from "@/assets/couple-photo.jpg";
import floralCorner from "@/assets/floral-corner.png";

const CoupleSection = () => {
  return (
    <section className="relative max-w-4xl mx-auto px-6 py-24 md:py-32 text-center overflow-hidden">
      <img
        src={floralCorner}
        alt=""
        className="absolute top-0 right-0 w-32 opacity-20 pointer-events-none scale-x-[-1]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative inline-block mb-10"
      >
        <div className="absolute -inset-4 border border-gold/30 rounded-t-full rounded-b-lg" 
          style={{ animation: "float 4s ease-in-out infinite" }} 
        />
        <div className="w-56 h-72 md:w-64 md:h-80 rounded-t-full overflow-hidden border-4 border-cream shadow-2xl mx-auto">
          <img
            src={couplePhoto}
            alt="Ola and Hazem"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="font-script text-5xl md:text-7xl text-burgundy mb-6">
          Our Love Story
        </h2>
        <p className="font-serif-elegant text-lg md:text-xl max-w-xl mx-auto leading-relaxed italic text-foreground/80">
          "In all the world, there is no heart for me like yours. In all the world,
          there is no love for you like mine."
        </p>
      </motion.div>
    </section>
  );
};

export default CoupleSection;
