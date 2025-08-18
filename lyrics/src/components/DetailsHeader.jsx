import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData, activeSong }) => {
  // Find the song that matches the currentSongId
  const selectedSong = songData?.find((song) => song.id === activeSong.id);

  return (
    <div className="relative w-full flex flex-col">
      {/* Background Gradient */}
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" >

      {/* Song / Artist Info */}
      <div className="flex items-center gap-4 p-4">
        {/* Artwork */}
        <img
          src={selectedSong?.artwork || songData?.[0]?.artwork}
          alt="artwork"
          className="w-32 h-32 rounded-lg object-cover shadow-lg"
        />

        <div className="flex flex-col">
          {/* Song Title */}
          <h2 className="text-4xl font-bold text-white">
            {selectedSong?.title || songData?.[0]?.title || "Unknown Song"}
          </h2>

          {/* Artist */}
          {artistId ? (
            <Link
              to={`/artists/${artistId}`}
              className=" text-gray-400 hover:underline mt-2 text-["
            >
              {artistData?.name || "Unknown Artist"}
            </Link>
          ) : (
            <p className="text-gray-400 hover:underline text-l mt-2">
              {selectedSong?.artistName || "Unknown Artist"}
            </p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
