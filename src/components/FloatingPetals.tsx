import { useEffect, useState } from "react";
import petalBurgundy from "@/assets/petal-burgundy.png";
import petalPink from "@/assets/petal-pink.png";

interface Petal {
  id: number;
  src: string;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

const FloatingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const createPetals = () => {
      const newPetals: Petal[] = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        src: i % 3 === 0 ? petalPink : petalBurgundy,
        left: Math.random() * 100,
        size: 20 + Math.random() * 35,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
      }));
      setPetals(newPetals);
    };

    createPetals();
    const interval = setInterval(createPetals, 16000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((petal) => (
        <img
          key={petal.id}
          src={petal.src}
          alt=""
          className="absolute pointer-events-none"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size,
            objectFit: "contain",
            animation: `petalFall ${petal.duration}s ease-in-out ${petal.delay}s forwards`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPetals;
