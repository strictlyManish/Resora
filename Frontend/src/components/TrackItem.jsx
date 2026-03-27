import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  User,
  ChevronLeft,
} from "lucide-react";

const TrackItem = ({ track }) => {
  const containerRef = useRef(null);
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          audioRef.current?.play().catch(() => setIsPlaying(false));
          setIsPlaying(true);
        } else {
          audioRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (duration) {
      setProgress((current / duration) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const togglePlay = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const navigate = useNavigate()

  return (
    <div
      ref={containerRef}
      className="h-screen w-full snap-start relative flex flex-col justify-end bg-neutral-950 overflow-hidden font-sans"
    >
      {/* Dynamic Background */}

      <button
        onClick={() => navigate(-1)}
        className="absolute z-20 top-4 left-4 flex items-center gap-2 bg-pink-600/50 text-white px-3 py-2 rounded-lg backdrop-blur"
      >
        <ChevronLeft size={18} />
        Back
      </button>
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-[2000ms] scale-110"
        style={{ backgroundImage: `url(${track.coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 backdrop-blur" />
      </div>

      {/* Main Content Overlay */}
      <div className="z-10 flex flex-row items-end p-6 gap-6 w-full ">
        {/* Left Side: Track Info */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            {/* Rotating Vinyl/Cover Art */}
            <div
              className={`relative w-16 h-16 rounded-full border-2 border-white/20 overflow-hidden shadow-2xl transition-transform duration-1000 ${isPlaying ? "rotate-[360deg] animate-[spin_8s_linear_infinite]" : ""}`}
            >
              <img
                src={track.coverImage}
                alt="cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-full border border-white/20" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-lg shadow-pink-500/20 truncate">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {track?.title.slice(0, 15) || "Untitled"}
                </span>
              </h2>
              <p className="text-white/70 text-sm flex items-center gap-1.5 font-medium">
                <User size={14} className="text-pink-500" />
                {track.artist} • {track.genre}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/10 w-fit">
            <button
              onClick={togglePlay}
              className="bg-white text-black p-3 rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg"
            >
              {isPlaying ? (
                <Pause size={20} fill="currentColor" />
              ) : (
                <Play size={20} fill="currentColor" />
              )}
            </button>

            <div className="flex flex-col gap-1 w-48">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => {
                  const seekTo =
                    (e.target.value / 100) * audioRef.current.duration;
                  audioRef.current.currentTime = seekTo;
                }}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] text-white/50 font-mono">
                <span>{currentTime}</span>
                <span>
                  {audioRef.current?.duration
                    ? formatTime(audioRef.current.duration)
                    : "0:00"}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Invisible Audio Element */}
      <audio
        ref={audioRef}
        src={track.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        muted={isMuted}
        loop
      />

      {/* Bottom Slim Progress Loader */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-300 z-20"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default TrackItem;
