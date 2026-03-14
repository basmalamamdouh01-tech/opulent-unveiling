import { useEffect, useState } from "react";

interface Bird {
  id: number;
  size: number;
  animation: string;
  delay: number;
  top: number;
}

const birdPath = "M4.5 9.5C5.5 8 7 7 9 7c1.5 0 2.5.5 3 1.5C13 7 15 6 17 7c2.5 1.2 2.5 4 .5 5.5L12 17l-5-4.5C5 11 4 10.5 4.5 9.5z";
const birdFlyPath = "M2 12c2-3 5-5 8-4 1.5.5 2 1.5 2 1.5s.5-1 2-1.5c3-1 6 1 8 4l-4-1.5-4 2-4-2L2 12z";

const BirdsSVG = () => {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [wave, setWave] = useState(0);

  useEffect(() => {
    // Initial wave
    spawnBirds();
    // Repeat every 12s
    const interval = setInterval(() => {
      setWave((w) => w + 1);
      spawnBirds();
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const spawnBirds = () => {
    const newBirds: Bird[] = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      size: 16 + Math.random() * 20,
      animation: i % 3 === 0 ? "fly2" : i % 3 === 1 ? "fly3" : "fly1",
      delay: i * 0.6 + Math.random() * 1.5,
      top: 10 + Math.random() * 50,
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
            animation: `${bird.animation} ${7 + Math.random() * 5}s ease-in-out forwards ${bird.delay}s`,
            opacity: 0,
          }}
          viewBox="0 0 24 24"
        >
          <path
            d={birdFlyPath}
            fill="hsl(350, 74%, 21%)"
            opacity={0.15 + Math.random() * 0.15}
          />
        </svg>
      ))}
    </>
  );
};

export default BirdsSVG;
