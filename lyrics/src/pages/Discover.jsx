// src/pages/Discover.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import SongCard from "../components/SongCard";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Discover = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data=[], isFetching, error } = useGetTopChartsQuery();
 //console.log(data)
  if (isFetching) return <Loader title="Songs Loading..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-3xl font-bold text-white mb-6">Discover Top Tracks</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {data.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
