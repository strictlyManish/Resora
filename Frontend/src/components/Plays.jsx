import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { Currentsong } from "../app/features/music/musicSlice";
import { useEffect, useState, useRef } from "react";
import {CirclePause, Play} from "lucide-react"

// Helper function to format seconds into mm:ss
const formatTime = (time) => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formatMinutes}:${formatSeconds}`;
  }
  return "00:00";
};

function Plays() {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to handle the back button
  const { currentSong: music, error, loading } = useSelector((state) => state.music);
  const dispatch = useDispatch();

  // Audio References and State
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(Currentsong({ id }));
    }
  }, [dispatch, id]);

  // Play/Pause Handler
  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  // Update current time as the song plays
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Set the total duration once the audio data loads
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Seek Handler for the progress bar
  const handleSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (loading) return <p className="p-5 text-pink-500">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">{error}</p>;
  if (!music) return <p className="p-5 text-gray-400">No music found.</p>;

  return (
    <div className="h-screen relative bg-[#120e12] overflow-hidden font-sans">
      {/* Functional Back Button - Fixed with high z-index and styling */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white/90 hover:text-white rounded-full transition-all border border-white/10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Background Image */}
      <img
        src={music.coverImage}
        alt={music.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Player UI Container */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end">
        
        {/* Glassmorphism Control Panel */}
        <div className="max-w-3xl w-full mx-auto backdrop-blur-xl bg-white/5 p-8 border-t border-white/10 shadow-2xl rounded-t-3xl pb-12">
          
          {/* Track Info */}
          <div className="text-center md:text-left mb-6">
            <h2 className="text-2xl md:text-5xl font-extrathine text-white mb-2 drop-shadow-lg tracking-tight">
              {music.title}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <p className="text-pink-400 text-xl font-medium">{music.artist}</p>
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
              <p className="text-gray-300 text-sm bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                {music.genre}
              </p>
            </div>
          </div>

          {/* Progress Bar & Timers */}
          <div className="flex items-center gap-4 mt-8">
            <span className="text-sm font-medium text-gray-400 w-12 text-right tabular-nums">
              {formatTime(currentTime)}
            </span>
            
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:accent-pink-400 transition-all focus:outline-none"
            />
            
            <span className="text-sm font-medium text-gray-400 w-12 tabular-nums">
              {formatTime(duration)}
            </span>
          </div>

          {/* Play/Pause Controls */}
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={togglePlayPause}
              className="bg-black px-2 py-2 rounded-full"
            >
              {isPlaying ? (
                /* Pause Icon */
                <CirclePause size={'30px'} color="pink" />
              ) : (
                /* Play Icon */
                <Play  size={'30px'} color="pink"/>
              )}
            </button>
          </div>

          {/* The Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={music.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)} 
          />
        </div>
      </div>
    </div>
  );
}

export default Plays;