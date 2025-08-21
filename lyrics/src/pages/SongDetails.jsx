import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, RelatedSongs } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
// 🎵 Generate sleek Spotify-like placeholder lyrics
const generateLyrics = () => [
  "If you wanna run away with me",

  "I know a galaxy and I can take you for a ride",

  "I had a premonition that we fell into a rhythm",

  "Where the music dont stop for life",

  "Glitter in the sky glitter in my eyes",

  "Shining just the way I like",

  "If youre feeling like you need a little bit of company",

  "You met me at the perfect time",

  "You want me I want you, baby",

  "My sugarboo Im levitating",
];

const getRandomSongs = (songs, count = 30) => {
  if (!songs) return [];
  return [...songs]
    .sort(() => Math.random() - 0.5) // shuffle
    .slice(0, count); // pick 20
};

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { data: songData } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const currentSong = songData?.find(
    (song) => String(song.id) === String(songid)
  );

  //console.log(currentSong)
  const lyrics = currentSong
    ? generateLyrics(currentSong?.title, currentSong?.artistName)
    : ["Lyrics not available for this song."];

  // Shuffle and pick N songs
  const [relatedSongs, setRelatedSongs] = useState([]);
  

  // shuffle only when songid changes
  useEffect(() => {
    if (songData) {
      const randomSongs = getRandomSongs(
        songData.filter((s) => String(s.id) !== String(songid)), // exclude current song
        30
      );
      setRelatedSongs(randomSongs);
    }
  }, [songid, songData]); // runs only when songid or data changes

  const handlePauseClick = () => dispatch(playPause(false));
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: relatedSongs, i }));
    dispatch(playPause(true));
  };

  // 🎤 Karaoke effect state
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentLine(
        (prev) => (prev < lyrics.length - 1 ? prev + 1 : 0) // 👈 reset to 0
      );
    }, 3000); // every 3 seconds highlight next line

    return () => clearInterval(interval);
  }, [isPlaying, lyrics.length]);

  //console.log(relatedSongs)
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} activeSong={currentSong} handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick} isPlaying={isPlaying}/>

      <div className="mb-10">
        <h2 className="text-violet-400 text-4xl font-bold mb-4 px-6">Lyrics</h2>
        <h1 className="text-violet-200 font-semibold text-2xl px-6">{`🎶 ${currentSong?.title} by ${currentSong?.artistName}`}</h1>
        <div className="mt-3 space-y-4 w-full px-6">
          {lyrics.map((line, i) => (
            <p
              key={i}
              className={`transition-all duration-1000 leading-relaxed ${
                i === currentLine
                  ? "text-white font-semibold text-2xl"
                  : "text-gray-400 text-xl"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
      <RelatedSongs
        relatedSongs={relatedSongs}
        activeSong={activeSong}
        isPlaying={isPlaying}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;