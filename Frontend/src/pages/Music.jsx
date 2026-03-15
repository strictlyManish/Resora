import React, { useEffect, useRef, useState } from "react";
import {
  Heart,
  MessageSquareText,
  Send,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";

const songs = [
  {
    id: 1,
    title: "Apna Bana Le",
    artist: "Arijit Singh",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Night Drive",
    artist: "LoFi Beats",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Chill Waves",
    artist: "Deep Focus",
    cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

function Music() {
  const audioRefs = useRef([]);
  const [progress, setProgress] = useState({});
  const [remainingTime, setRemainingTime] = useState({});
  const [isPlaying, setIsPlaying] = useState({});
  const [userInteracted, setUserInteracted] = useState(false);

  // Autoplay when reel visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const audio = entry.target.querySelector("audio");
          if (!audio || !userInteracted) return;

          if (entry.isIntersecting) {
            audio.play().catch(() => {});
          } else {
            audio.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    const reels = document.querySelectorAll(".reel");
    reels.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [userInteracted]);

  // Format time
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Update progress
  const handleTimeUpdate = (index) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    const remain = audio.duration - audio.currentTime;

    setProgress((prev) => ({ ...prev, [index]: percent }));
    setRemainingTime((prev) => ({ ...prev, [index]: formatTime(remain) }));
  };

  // Toggle play/pause
  const togglePlay = (e, index) => {
    if (e) e.stopPropagation(); // Prevents reel click event from firing when clicking buttons
    setUserInteracted(true);

    const audio = audioRefs.current[index];
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  // Seek audio
  const seekAudio = (e, index) => {
    e.stopPropagation();
    const audio = audioRefs.current[index];
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  };

  // Navigate songs
  const navigateSong = (e, index, direction) => {
    if (e) e.stopPropagation();
    
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < audioRefs.current.length) {
      const targetReel = document.querySelectorAll(".reel")[targetIndex];
      targetReel.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black text-white">
      {songs.map((song, index) => (
        <div
          key={song.id}
          className="reel h-screen snap-start relative flex items-center justify-center cursor-pointer"
          onClick={(e) => togglePlay(e, index)}
        >
          {/* Background */}
          <img
            src={song.cover}
            alt="Album Cover"
            className="absolute w-full h-full object-cover opacity-60"
          />

          {/* Gradient Overlays for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/90" />

          {/* Side Action Buttons */}
          <div className="absolute right-4 bottom-48 flex text-center flex-col gap-6 text-2xl z-10">
            <button className="hover:scale-110 transition-transform">
              <Heart size={28} />
              <span className="text-[12px] text-gray-200 mt-1 block">25.6K</span>
            </button>
            <button className="hover:scale-110 transition-transform">
              <MessageSquareText size={28} />
              <span className="text-[12px] text-gray-200 mt-1 block">1.2K</span>
            </button>
            <button className="hover:scale-110 transition-transform">
              <Send size={28} />
              <span className="text-[12px] text-gray-200 mt-1 block">Share</span>
            </button>
          </div>

          {/* Bottom Info & Player Controls */}
          <div className="absolute bottom-10 left-6 right-6 z-10">
            {/* Track Info */}
            <h2 className="text-3xl font-bold tracking-tight drop-shadow-md">
              {song.title}
            </h2>
            <p className="text-gray-300 text-lg drop-shadow-md">{song.artist}</p>

            {/* Progress Bar Container */}
            <div className="mt-6 mb-2">
              <div
                onClick={(e) => seekAudio(e, index)}
                className="w-full h-2 bg-white/30 rounded-full cursor-pointer relative overflow-hidden group"
              >
                <div
                  className="h-full rounded-full transition-all duration-100 ease-linear"
                  style={{
                    width: `${progress[index] || 0}%`,
                    background: "linear-gradient(90deg, #ff2d55, #ff7a18)",
                    boxShadow: "0 0 10px rgba(255,45,85,0.5)",
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-300 mt-2 font-medium">
                <span>{formatTime((audioRefs.current[index]?.duration || 0) * ((progress[index] || 0) / 100))}</span>
                <span>-{remainingTime[index] || "0:00"}</span>
              </div>
            </div>

            {/* Media Controls */}
            <div className="flex items-center  gap-5 mt-4">
              <button
                onClick={(e) => navigateSong(e, index, -1)}
                className={`transition-colors ${
                  index === 0 ? "text-white/30 cursor-not-allowed" : "text-white hover:text-gray-300 active:scale-95"
                }`}
              >
                <SkipBack size={20} fill="currentColor" />
              </button>

              <button
                onClick={(e) => togglePlay(e, index)}
                className="w-12 h-12 flex items-center justify-center text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                {isPlaying[index] ? (
                  <Pause  fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" />
                )}
              </button>

              <button
                onClick={(e) => navigateSong(e, index, 1)}
                className={`transition-colors ${
                  index === songs.length - 1 ? "text-white/30 cursor-not-allowed" : "text-white hover:text-gray-300 active:scale-95"
                }`}
              >
                <SkipForward size={20} fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Audio Element */}
          <audio
            ref={(el) => (audioRefs.current[index] = el)}
            src={song.audio}
            loop={false}
            onTimeUpdate={() => handleTimeUpdate(index)}
            onEnded={() => navigateSong(null, index, 1)}
            onPlay={() => setIsPlaying((prev) => ({ ...prev, [index]: true }))}
            onPause={() => setIsPlaying((prev) => ({ ...prev, [index]: false }))}
          />
        </div>
      ))}
    </div>
  );
}

export default Music;