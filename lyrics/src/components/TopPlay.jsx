import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

//console.log(song)
const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between">
      <img
        className="w-20 h-20 rounded-lg"
        src={song?.artwork}
        alt={song.albumName}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.id}`}>
          <p className="text-xl font-bold text-white">{song?.albumName}</p>
        </Link>
        <Link to={`/artists/${song.artistId}`}>
          <p className="text-base font-bold text-gray-300 mt-1">
            {song?.artistName}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause 
    isPlaying={isPlaying}
    activeSong={activeSong}
    song={song}
    handlePause={handlePauseClick}
    handlePlay={handlePlayClick}
    />
  </div>
);
const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const topPlays = data?.slice(0, 5);
  const topArtist = data?.slice(5,12)
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>
        <div className="mt-3 flex flex-col">
          {topPlays?.map((song, i) => (
            <TopChartCard 
            song={song} 
            i={i} 
            key={song.id} 
            isPlaying = {isPlaying}
            activeSong = {activeSong}
            handlePauseClick = {handlePauseClick}
            handlePlayClick = { ()=>handlePlayClick(song,i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>
        <div className="w-full overflow-hidden">
          <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          grabCursor={true}
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topArtist?.map((song, i) => (
            <SwiperSlide
              key={song?.id}
              className="flex justify-center items-center shadow-lg rounded-full animate-slideleft !w-auto"
              // style={{ width: "auto" }} // ✅ let slide size fit content
            >
              <Link to={`/artists/${song?.artistId}`}>
                <img
                  src={song?.artistImage}
                  alt={song?.artistName}
                  className="rounded-full object-cover w-24 h-24"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
        
      </div>
    </div>
  );
};

export default TopPlay;
