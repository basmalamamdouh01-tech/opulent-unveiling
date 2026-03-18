import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  speed: number;
  decay: number;
  life: number;
  gravity: number;
  type: "spark" | "circle" | "star";
}

interface Firework {
  id: number;
  x: number;
  y: number;
  targetY: number;
  exploded: boolean;
  particles: Particle[];
  color: string;
}

const COLORS = [
  "hsl(350, 60%, 55%)",  // burgundy-rose
  "hsl(42, 70%, 60%)",   // gold
  "hsl(330, 50%, 65%)",  // pink
  "hsl(20, 80%, 65%)",   // warm orange
  "hsl(45, 90%, 70%)",   // bright gold
  "hsl(0, 70%, 60%)",    // red
  "hsl(280, 40%, 65%)",  // soft purple
  "hsl(180, 40%, 65%)",  // teal
];

const FireworksCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireworksRef = useRef<Firework[]>([]);
  const animFrameRef = useRef<number>(0);
  const nextIdRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const createParticles = (x: number, y: number, color: string): Particle[] => {
      const particles: Particle[] = [];
      const count = 60 + Math.random() * 40;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        particles.push({
          id: i,
          x, y, color,
          size: 1.5 + Math.random() * 2.5,
          angle,
          speed: 2 + Math.random() * 4,
          decay: 0.015 + Math.random() * 0.015,
          life: 1,
          gravity: 0.04,
          type: Math.random() > 0.7 ? "star" : Math.random() > 0.4 ? "circle" : "spark",
        });
      }
      return particles;
    };

    const launchFirework = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      fireworksRef.current.push({
        id: nextIdRef.current++,
        x: w * 0.15 + Math.random() * w * 0.7,
        y: h,
        targetY: h * 0.1 + Math.random() * h * 0.4,
        exploded: false,
        particles: [],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      fireworksRef.current = fireworksRef.current.filter((fw) => {
        if (!fw.exploded) {
          // Rising
          fw.y -= 4;
          ctx.beginPath();
          ctx.arc(fw.x, fw.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = fw.color;
          ctx.fill();
          // Trail
          ctx.beginPath();
          ctx.moveTo(fw.x, fw.y);
          ctx.lineTo(fw.x + (Math.random() - 0.5) * 2, fw.y + 15);
          ctx.strokeStyle = fw.color;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.6;
          ctx.stroke();
          ctx.globalAlpha = 1;

          if (fw.y <= fw.targetY) {
            fw.exploded = true;
            fw.particles = createParticles(fw.x, fw.y, fw.color);
          }
          return true;
        } else {
          // Particles
          fw.particles = fw.particles.filter((p) => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed + p.gravity;
            p.speed *= 0.97;
            p.gravity += 0.01;
            p.life -= p.decay;

            if (p.life <= 0) return false;

            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;

            if (p.type === "circle") {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            } else if (p.type === "star") {
              ctx.beginPath();
              for (let i = 0; i < 5; i++) {
                const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                const r = p.size * 1.5;
                ctx.lineTo(p.x + Math.cos(a) * r, p.y + Math.sin(a) * r);
                const a2 = a + Math.PI / 5;
                ctx.lineTo(p.x + Math.cos(a2) * r * 0.4, p.y + Math.sin(a2) * r * 0.4);
              }
              ctx.closePath();
              ctx.fill();
            } else {
              ctx.fillRect(p.x, p.y, p.size, p.size);
            }
            ctx.globalAlpha = 1;
            return true;
          });
          return fw.particles.length > 0;
        }
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    // Launch fireworks in waves
    const intervals: NodeJS.Timeout[] = [];
    
    // Initial burst
    setTimeout(() => { launchFirework(); launchFirework(); }, 200);
    setTimeout(() => { launchFirework(); }, 600);
    setTimeout(() => { launchFirework(); launchFirework(); }, 1000);
    
    // Continuous launches
    const mainInterval = setInterval(() => {
      launchFirework();
      if (Math.random() > 0.5) {
        setTimeout(launchFirework, 200 + Math.random() * 300);
      }
    }, 800 + Math.random() * 600);
    intervals.push(mainInterval);

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      intervals.forEach(clearInterval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

// Confetti pieces
const ConfettiPiece = ({ delay, startX }: { delay: number; startX: number }) => {
  const colors = [
    "hsl(350, 60%, 55%)",
    "hsl(42, 70%, 60%)",
    "hsl(330, 50%, 65%)",
    "hsl(20, 80%, 65%)",
    "hsl(45, 90%, 70%)",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = 6 + Math.random() * 8;
  const isCircle = Math.random() > 0.5;

  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{
        left: `${startX}%`,
        width: isCircle ? size : size * 0.6,
        height: isCircle ? size : size * 1.4,
        borderRadius: isCircle ? "50%" : "2px",
        backgroundColor: color,
      }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y: [0, 600, 900],
        opacity: [1, 1, 0],
        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1), 720 * (Math.random() > 0.5 ? 1 : -1)],
        x: [0, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 200],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
      }}
    />
  );
};

const FireworksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShowEffects(true);
    }
  }, [isInView]);

  const confettiPieces = Array.from({ length: 40 }, (_, i) => ({
    delay: Math.random() * 2,
    startX: Math.random() * 100,
  }));

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden min-h-[500px] flex items-center justify-center"
    >
      {/* Dark overlay for fireworks visibility */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, hsl(350, 30%, 12%), hsl(250, 20%, 8%), hsl(350, 30%, 12%))",
        }}
      />

      {/* Stars background */}
      {showEffects && Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            width: 1 + Math.random() * 2,
            height: 1 + Math.random() * 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: "white",
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Fireworks canvas */}
      {showEffects && <FireworksCanvas />}

      {/* Confetti */}
      {showEffects && confettiPieces.map((piece, i) => (
        <ConfettiPiece key={i} delay={piece.delay} startX={piece.startX} />
      ))}

      {/* Quote content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Decorative top */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <span className="text-3xl">✦</span>
          </motion.div>

          <motion.p
            className="font-script text-3xl md:text-5xl leading-relaxed mb-6"
            style={{ color: "hsl(42, 70%, 70%)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            "Two souls, one heart,
            <br />
            forever as one"
          </motion.p>

          <motion.div
            className="w-16 h-[1px] mx-auto mb-6"
            style={{ backgroundColor: "hsl(42, 52%, 56%)" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          />

          <motion.p
            className="font-ui text-sm md:text-base tracking-[0.15em]"
            style={{ color: "hsl(40, 30%, 75%)" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            HAZEM & OLA
          </motion.p>

          <motion.p
            className="font-script text-lg md:text-xl mt-4"
            style={{ color: "hsl(42, 50%, 60%)" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            The best is yet to come ♥
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default FireworksSection;
