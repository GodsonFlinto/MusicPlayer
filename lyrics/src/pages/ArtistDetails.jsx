import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error, Loader, SongBar } from "../components";
import {
  useGetArtistDetailsQuery,
  useGetArtistTopTracksQuery,
} from "../redux/services/shazamCore";
import { setActiveSong, playPause } from "../redux/features/playerSlice";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const dispatch = useDispatch()
   const handlePauseClick = () => dispatch(playPause(false));
    const handlePlayClick = (song, i) => {
      dispatch(setActiveSong({ song, data: topTracks, i }));
      dispatch(playPause(true));
    };
  // Fetch artist details
  const {
    data: artistData,
    isFetching: isFetchingArtist,
    error: artistError,
  } = useGetArtistDetailsQuery(artistId);

  // Fetch artist's top tracks
  const {
    data: topTracks,
    isFetching: isFetchingTracks,
    error: tracksError,
  } = useGetArtistTopTracksQuery(artistId);

  console.log(topTracks)
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetchingArtist || isFetchingTracks)
    return <Loader title="Loading artist details..." />;
  if (artistError || tracksError) return <Error />;

  return (
    <div className="flex flex-col">
      {/* 🎨 Artist Header */}
      <div className="relative w-full flex flex-col">
        <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-60 h-40" />

        <div className="flex items-center gap-6 p-6 -mt-60">
          {/* Artist Image */}
          <img
            src={artistData?.images?.[0]?.url}
            alt="Artist"
            className="w-40 h-40 rounded-full object-cover shadow-2xl"
          />

          <div className="flex flex-col text-white">
            <h2 className="text-5xl font-bold">{artistData?.name}</h2>
            <p className="mt-5 text-base text-gray-300">
              {artistData?.genres?.length > 0
                ? artistData.genres.map((g) => g.charAt(0).toUpperCase() + g.slice(1)).join(", ")
                : "Unknown Genre"}
            </p>
            <p className="mt-1 text-green-400">
              {artistData?.followers?.total?.toLocaleString()} Followers
            </p>
            <p className="mt-1 text-white">
              Popularity: {artistData?.popularity} / 100
            </p>
          </div>
        </div>
      </div>

      {/* 🎶 Top Tracks Section */}
      <div className="mt-12 px-6">
        <h2 className="text-violet-400 text-3xl font-bold mb-6">
          Top Tracks
        </h2>

        {topTracks?.length > 0 ? (
          <div className="flex flex-col gap-4">
            {topTracks.map((song, i) => (
              <SongBar
                key={song.id}
                song={{
                  id: song.id,
                  title: song.name,
                  artistName: song.artists.map((a) => a.name).join(", "),
                  artwork: song.album.images[0]?.url,
                  previewUrl: song.preview_url,
                  duration: song.duration_ms,
                  artists: song.artists
                }}
        
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick = {() => handlePlayClick(song, i)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No top tracks available.</p>
        )}
      </div>
    </div>
  );
};

export default ArtistDetails;
