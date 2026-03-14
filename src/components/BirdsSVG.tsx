import { useEffect, useState } from "react";

interface Bird {
  id: number;
  size: number;
  animation: string;
  delay: number;
  top: number;
  opacity: number;
}

const birdFlyPath = "M2 12c2-3 5-5 8-4 1.5.5 2 1.5 2 1.5s.5-1 2-1.5c3-1 6 1 8 4l-4-1.5-4 2-4-2L2 12z";

const BirdsSVG = () => {
  const [birds, setBirds] = useState<Bird[]>([]);

  useEffect(() => {
    spawnBirds();
    const interval = setInterval(() => {
      spawnBirds();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const spawnBirds = () => {
    const newBirds: Bird[] = Array.from({ length: 9 }, (_, i) => ({
      id: Date.now() + i,
      size: 30 + Math.random() * 35,
      animation: i % 3 === 0 ? "fly2" : i % 3 === 1 ? "fly3" : "fly1",
      delay: i * 0.4 + Math.random() * 1,
      top: 5 + Math.random() * 60,
      opacity: 0.3 + Math.random() * 0.4,
    }));
    setBirds(newBirds);
  };

  return (
    <>
      {birds.map((bird) => (
        <svg
          key={bird.id}
          className="fixed pointer-events-none z-40"
          style={{
            width: bird.size,
            height: bird.size,
            top: `${bird.top}%`,
            animation: `${bird.animation} ${6 + Math.random() * 4}s ease-in-out forwards ${bird.delay}s`,
            opacity: 0,
          }}
          viewBox="0 0 24 24"
        >
          <path
            d={birdFlyPath}
            fill="hsl(350, 74%, 21%)"
            opacity={bird.opacity}
          />
        </svg>
      ))}
    </>
  );
};

export default BirdsSVG;
