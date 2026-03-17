import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";

const Countdown = () => {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date("April 2, 2026 18:00:00").getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {[
        { val: time.days, label: "Days" },
        { val: time.hours, label: "Hrs" },
        { val: time.mins, label: "Mins" },
        { val: time.secs, label: "Secs" },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <span className="font-serif-elegant text-3xl md:text-4xl font-light block text-burgundy">
            {String(item.val).padStart(2, "0")}
          </span>
          <span className="font-ui text-[10px] text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const DetailsSection = () => {
  return (
    <section className="bg-muted py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="font-ui text-xs md:text-sm mb-8 text-gold tracking-[0.2em]">
            THE CELEBRATION
          </h3>
          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-serif-elegant font-semibold text-lg text-foreground">
                  Thursday, April 2, 2026
                </h4>
                <p className="text-muted-foreground font-serif-elegant">Save the date</p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-serif-elegant font-semibold text-lg text-foreground">
                  6:00 PM — Katb Ketab
                </h4>
                <p className="text-muted-foreground font-serif-elegant">
                  Religious ceremony
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-serif-elegant font-semibold text-lg text-foreground">
                  7:00 PM — Ceremony
                </h4>
                <p className="text-muted-foreground font-serif-elegant">
                  Ceremony begins
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-serif-elegant font-semibold text-lg text-foreground">
                  The Grove Venue
                </h4>
                <p className="text-muted-foreground font-serif-elegant">Cairo, Egypt</p>
                <a
                  href="https://maps.app.goo.gl/GAa6SbfoHspkzTge8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold underline text-sm mt-1 inline-block font-serif-elegant"
                >
                  View on Maps →
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-background p-10 md:p-12 shadow-xl border border-gold/10 text-center"
        >
          <h3 className="font-ui text-[10px] md:text-xs mb-8 text-gold tracking-[0.2em]">
            COUNTING DOWN
          </h3>
          <Countdown />
          <a
            href="#rsvp"
            className="mt-10 block w-full py-4 bg-burgundy text-primary-foreground font-ui text-xs tracking-[0.2em] hover:opacity-90 transition-opacity text-center"
          >
            RSVP YOUR ATTENDANCE
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DetailsSection;
