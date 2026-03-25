import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchMusic } from "../app/features/music/musicSlice";
import { Loader } from "lucide-react";
import TrackItem from "./TrackItem";



export default function Plays() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { musicList: music, loading } = useSelector(
    (state) => state.music,
    shallowEqual
  );

  useEffect(() => {
    if (music.length === 0) {
      dispatch(fetchMusic());
    }
  }, [dispatch, music.length]);

  useEffect(() => {
    if (music.length > 0 && id) {
      const targetElement = document.getElementById(`track-${id}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "instant" });
      }
    }
  }, [music, id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#120e12] flex items-center justify-center">
        <Loader color="#ec4899" size={20} className="animate-spin" />
      </main>
    );
  }

  return (
    <div className="h-[100dvh] w-full bg-black overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {music.map((track) => (
        <div key={track._id} id={`track-${track._id}`} className="w-full">
          <TrackItem track={track} />
        </div>
      ))}
    </div>
  );
}