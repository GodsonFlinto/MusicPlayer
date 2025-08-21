import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";

const DetailsHeader = ({
  artistId,
  artistData,
  songData,
  activeSong,
  isPlaying,
  handlePauseClick,
  handlePlayClick,
}) => {
  // Find the song that matches the current active song
const selectedSong = songData?.find((song) => song.id === activeSong?.id) || songData?.[0];
  return (
    <div className="relative w-full flex flex-col">
      {/* Background Gradient */}
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28">
        {/* Song / Artist Info */}
        <div className="flex items-center justify-between gap-4 p-4">
          {/* Left Side: Artwork + Info */}
          <div className="flex items-center gap-4">
            {/* Artwork */}
            <img
              src={selectedSong?.artwork}
              alt="artwork"
              className="w-40 h-40 rounded-lg object-cover shadow-lg"
            />

            <div className="flex flex-col">
              {/* Song Title */}
              <h2 className="text-4xl font-bold text-white">
                {selectedSong?.title || "Unknown Song"}
              </h2>

              {/* Artist */}
              {artistId ? (
                <Link
                  to={`/artists/${artistId}`}
                  className="text-gray-400 hover:underline mt-2 text-lg"
                >
                  {artistData?.name || "Unknown Artist"}
                </Link>
              ) : (
                <p className="text-gray-400 text-lg mt-2">
                  {selectedSong?.artistName || "Unknown Artist"}
                </p>
              )}
            </div>
          </div>

          {/* Right Side: Play/Pause */}
          <div className="flex items-center cursor-pointer">
<div className="bg-gray-500 hover:bg-gray-400 w-16 h-16 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition">
              <PlayPause
                isPlaying={isPlaying}
                activeSong={activeSong}
                song={selectedSong}
                handlePause={handlePauseClick}
                handlePlay={() => handlePlayClick(selectedSong)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
