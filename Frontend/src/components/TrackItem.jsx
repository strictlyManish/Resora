import { useEffect, useRef, useState } from "react";
import {Play, Pause, Music, Volume2, VolumeX, CirclePlay, User} from "lucide-react"

const TrackItem = ({ track }) => {
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  
  // Custom UI State
  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {


    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          audioRef.current?.play().catch(() => {
            // Browser might block autoplay until user interacts
            setIsPlaying(false);
          });
          setIsPlaying(true);
        } else {
          audioRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Sync state with audio events
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (duration) {
      setProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e) => {
    const seekTo = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTo;
    setProgress(e.target.value);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full snap-start relative flex flex-col justify-end bg-black overflow-hidden"
    >
      {/* 1. Background Image with Blur Overlay */}

      {/* 2. Custom UI Content */}
      <div className="z-10 p-6 w-full to-transparent">
        
        {/* Track Info */}
        <div className="flex items-center gap-4 mb-6 transition-all">
          <div className="w-20 h-20 rounded-lg border border-white/20 overflow-hidden shadow-xl">
            <img src={track.coverImage} alt="cover" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white drop-shadow-md truncate">
              {track?.title?.slice(0, 20) || "Untitled Track"}
            </h2>
            <p className="text-gray-300 text-sm flex items-center gap-1">
              <User size={20} className="animate-pulse "  />
            {track.artist}
            </p>
            <p className="text-gray-300 text-sm flex items-center gap-1 mt-2 uppercase">
              <CirclePlay size={20} className="animate-pulse "  /> {track.genre}
            </p>
          </div>
        </div>

        {/* Interactive Controls Row */}
        <div className="flex items-center gap-4 w-ful">
          <button 
            onClick={togglePlay}
            className="bg-white text-black p-3 rounded-full hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          </button>

          <div className="relative flex-grow group">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className="text-white/80 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-700 scale-105"
        style={{ backgroundImage: `url(${track.coverImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* 3. Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={track.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        muted={isMuted}
        loop
      />

      {/* 4. The "Reels" Progress Indicator (Bottom Border) */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-pink-500 transition-all duration-200 shadow-[0_-2px_10px_rgba(236,72,153,0.5)]" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default TrackItem