// src/pages/Discover.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetSongsbyGenreQuery } from "../redux/services/shazamCore";
import SongCard from "../components/SongCard";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { genres } from "../assets/constants";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  const { data=[], isFetching, error } = useGetSongsbyGenreQuery(genreListId);
  //console.log(data)
  if (isFetching) return <Loader title="Songs Loading..." />;
  if (error) return <Error />;

const genreTitle = genres.find(({ value }) => value === genreListId)?.title || "Trending Now Tamil";
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="text-3xl font-bold text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "pop"}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>{genre.title}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
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
