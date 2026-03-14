import { useState, useRef } from "react";
import { Music, Pause } from "lucide-react";

const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      );
      audioRef.current.loop = true;
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border border-gold flex items-center justify-center bg-background/80 backdrop-blur-sm shadow-lg text-burgundy hover:scale-110 transition-transform"
      aria-label={playing ? "Pause music" : "Play music"}
    >
      {playing ? <Pause className="w-5 h-5" /> : <Music className="w-5 h-5" />}
    </button>
  );
};

export default MusicToggle;
