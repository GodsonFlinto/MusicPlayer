import SongBar from "./SongBar";

const RelatedSongs = ({
  relatedSongs,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="mt-16">
    <h2 className="text-violet-400 text-4xl font-bold mb-6 px-6">
      Related Songs
    </h2>
    <div className="mt-6 w-full flex flex-col">
      {relatedSongs.map((song, i) => (
        <SongBar
          key={song.id}
          song={song}
          isPlaying={isPlaying}
          activeSong={activeSong}
          i={i}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
