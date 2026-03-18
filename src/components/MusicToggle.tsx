import { useState, useRef, useEffect, useCallback } from "react";
import { Music, Pause } from "lucide-react";

const MusicToggle = ({ autoPlay = false }: { autoPlay?: boolean }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/music/wedding-song.mp3");
      audioRef.current.loop = true;
    }
    return audioRef.current;
  }, []);

  useEffect(() => {
    if (autoPlay) {
      const audio = getAudio();
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [autoPlay, getAudio]);

  const toggle = () => {
    const audio = getAudio();
    if (playing) {
      audio.pause();
    } else {
      audio.play();
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
