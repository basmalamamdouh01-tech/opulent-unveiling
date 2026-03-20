import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const MapSection = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <h3 className="font-script text-4xl md:text-5xl text-burgundy text-center mb-10">
          The Venue
        </h3>
        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.5!2d31.4!3d30.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zThe+Grove!5e0!3m2!1sen!2seg!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="The Grove Venue Location"
          />
        </div>
        <div className="text-center mt-8 flex flex-col items-center gap-3">
          <a
            href="https://maps.app.goo.gl/HKpUg74qjM8uj2R96?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 bg-gold/5 hover:bg-gold/15 transition-colors font-ui text-xs tracking-[0.15em] text-foreground/70 hover:text-gold"
          >
            📍 OPEN IN MAPS
          </a>
          <a
            href="https://www.instagram.com/thegrovecairo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-xs text-foreground/60 hover:text-gold transition-colors inline-flex items-center gap-2 tracking-[0.15em]"
          >
            <Instagram className="w-4 h-4" />
            @thegrovecairo
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default MapSection;
