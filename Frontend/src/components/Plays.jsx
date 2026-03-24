import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Currentsong } from "../app/features/music/musicSlice";
import { useEffect, useState, useRef } from "react";
import { 
  ChevronLeft, 
  Heart, 
  Repeat, 
  SkipBack, 
  SkipForward, 
  ListMusic, 
  Play, 
  Pause 
} from "lucide-react";

const formatTime = (time) => {
  if (time && !isNaN(time)) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  }
  return "00:00";
};

function Plays() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentSong: music, loading } = useSelector((state) => state.music);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (id) dispatch(Currentsong({ id }));
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, [dispatch, id]);

  const togglePlay = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  if (loading || !music) return <div className="h-screen bg-pink" />;

  return (
    <div className="h-screen w-full relative bg-pink text-white overflow-hidden font-sans">
      
      {/* 1. Background Image with Teal Tint */}
      <div className="absolute inset-0">
        <img src={music.coverImage} alt="" className="w-full h-full object-cover grayscale-[0.3]" />
        {/* The "pinkish" Overlay */}
        <div className="absolute inset-0 bg-teal-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-pink via-transparent to-pink/40" />
      </div>

      {/* 2. Top Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <button onClick={() => navigate(-1)}><ChevronLeft size={28} /></button>
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-tight">{music.title}</h1>
          <p className="text-[10px] text-gray-300 uppercase tracking-widest">A selection of hits</p>
        </div>
        <button><Heart size={24} className="hover:fill-white transition-all" /></button>
      </header>

      {/* 3. Stylized Vertical Artist Name */}
      <div className="relative z-10 flex flex-col items-end justify-center h-[55%] pr-8">
        <div className="[writing-mode:vertical-lr] rotate-180 flex items-center gap-4">
          <span className="text-pink-400 font-bold tracking-[0.2em] uppercase text-sm">
            {music.artist.split(',')[0]}
          </span>
          <h2 className="text-5xl md:text-7xl font-pink text-transparent border-text uppercase tracking-tighter"
              style={{ WebkitTextStroke: '1px rgba(245, 40, 145, 0.8)' }}>
            {music.artist.split(',')[0]}
          </h2>
        </div>
      </div>

      {/* 4. Controls & Progress */}
      <div className="absolute bottom-0 w-full z-10 p-8 pb-12 bg-gradient-to-t from-pink to-transparent">
        
        {/* Playback Buttons */}
        <div className="flex items-center justify-between mb-8 px-4">
          <button className="text-gray-400 hover:text-white"><Repeat size={20} /></button>
          <button className="text-white"><SkipBack size={28} fill="currentColor" /></button>
          
          {/* Main pink Play Button */}
          <button 
            onClick={togglePlay}
            className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/20 hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause size={30} fill="pink" className="text-pink" />
            ) : (
              <Play size={30} fill="pink" className="text-pink ml-1" />
            )}
          </button>

          <button className="text-white"><SkipForward size={28} fill="currentColor" /></button>
          <button className="text-gray-400 hover:text-white"><ListMusic size={20} /></button>
        </div>

        {/* Custom Progress Bar */}
        <div className="space-y-2">
          <div className="relative w-full h-1 bg-gray-600 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-pink-500 transition-all duration-300" 
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-gray-400 tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Hidden Audio */}
      <audio
        ref={audioRef}
        src={music.audioUrl}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={() => setIsPlaying(false)}
      />

      
    </div>
  );
}

export default Plays;