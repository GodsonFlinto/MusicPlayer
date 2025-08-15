import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useDispatch } from "react-redux";

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => dispatch(playPause(false));
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
//console.log(data)
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer group">
      <div className="relative w-full h-56">
        <img src={song.artwork} alt={song.titleName} className="w-full h-full rounded-lg" />
        {activeSong?.id === song.id && isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
          </div>
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition"
            onClick={handlePlayClick}
          >
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song.id}`}>{song?.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={`/artists/${song.artistName || 'unknown'}`}>{song.artistName}</Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
