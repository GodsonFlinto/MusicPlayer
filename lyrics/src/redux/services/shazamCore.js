import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSpotifyToken } from "../../spotifyToken";

const SPOTIFY_CLIENT_ID = "2d4657b0df2f4c8f95e89d2aa6200c25";
const SPOTIFY_CLIENT_SECRET = "57089db686e740439b32173b2e8d2089";

// Local songs import
import aasaKooda from "../../music/Aasa Kooda.mp3";
import adiPenne from "../../music/Adi Penne.mp3";
import benz from "../../music/Benz.mp3";
import disco from "../../music/Disco.mp3";
import heyMinnale from "../../music/Hey Minnale.mp3";
import iAmTheDanger from "../../music/I Am The Danger.mp3";
import jinguchaaThugLife from "../../music/Jinguchaa - Thug Life.mp3";
import kanimaa from "../../music/Kanimaa.mp3";
import katchiSera from "../../music/Katchi Sera.mp3";
import kissik from "../../music/Kissik.mp3";
import kokki from "../../music/Kokki.mp3";
import matta from "../../music/Matta.mp3";
import mobsta from "../../music/Mobsta.mp3";
import mundhinamParthene from "../../music/Mundhinam Parthene.mp3";
import peelings from "../../music/Peelings.mp3";
import powerhouse from "../../music/Powerhouse.mp3";
import salambala from "../../music/Salambala.mp3";
import tamilselvi from "../../music/Tamilselvi.mp3";
import Kannadi from "../../music/The One - Retro - MassTamilan.mp3";
import thenkizhakku from "../../music/Thenkizhakku.mp3";
import thuliThuli from "../../music/Thuli Thuli.mp3";
import vazhithunaiye from "../../music/Vazhithunaiye.mp3";
import waterPacket from "../../music/Water Packet.mp3";
import yedi from "../../music/Yedi.mp3";
import monica from "../../music/Monica.mp3";
import arabickuthu from "../../music/Arabic Kuthu.mp3";
import huntervantaar from "../../music/Hunter Vantaar.mp3";
import defaultSong from "../../music/Salambala.mp3";

export const localSongMap = [
  { title: "Aasa Kooda", src: aasaKooda },
  { title: "Adi Penne", src: adiPenne },
  { title: "Benz", src: benz },
  { title: "Disco", src: disco },
  { title: "Hey Minnale", src: heyMinnale },
  { title: "I Am The Danger", src: iAmTheDanger },
  { title: "Jinguchaa - Thug Life", src: jinguchaaThugLife },
  { title: "Kanimaa", src: kanimaa },
  { title: "Katchi Sera", src: katchiSera },
  { title: "Kissik", src: kissik },
  { title: "Kokki", src: kokki },
  { title: "Matta", src: matta },
  { title: "Mobsta", src: mobsta },
  { title: "Mundhinam Parthene", src: mundhinamParthene },
  { title: "Peelings", src: peelings },
  { title: "Powerhouse", src: powerhouse },
  { title: "Salambala", src: salambala },
  { title: "Tamilselvi", src: tamilselvi },
  { title: "The One - MassTamilan", src: Kannadi },
  { title: "Thenkizhakku", src: thenkizhakku },
  { title: "Thuli Thuli", src: thuliThuli },
  { title: "Vazhithunaiye", src: vazhithunaiye },
  { title: "Water Packet", src: waterPacket },
  { title: "Yedi", src: yedi },
  { title: "Arabic Kuthu", src: arabickuthu },
  { title: "Monica", src: monica },
  { title: "Hunter Vantaar", src: huntervantaar },
];

const fetchArtist = async (token, name) => {
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        name
      )}&type=artist&limit=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();

    if (!data?.artists?.items?.length) return null;

    const artist = data.artists.items[0];
    return {
      id: artist.id,
      name: artist.name,
      images: artist.images,
      genres: artist.genres,
      followers: artist.followers.total,
      popularity: artist.popularity,
    };
  } catch (err) {
    console.error("Spotify fetch error (artist):", err);
    return null;
  }
};

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    // ✅ Get Top Charts (songs)
    getTopCharts: builder.query({
      async queryFn() {
        try {
          const token = await getSpotifyToken(
            SPOTIFY_CLIENT_ID,
            SPOTIFY_CLIENT_SECRET
          );

          const searchQueries = [
            "trending tamil",
            "latest dance",
            "vibe tamil",
            "sad melodies",
            "thalapathy vijay hits",
            "english top",
            "tamil new",
            
          ];
          const allTracks = [];

          // Fetch Spotify tracks
          for (const query of searchQueries) {
            const res = await fetch(
              `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                query
              )}&type=track&limit=50`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const data = await res.json();
            if (data?.tracks?.items) allTracks.push(...data.tracks.items);
          }

          // Deduplicate tracks
          const uniqueTracks = Array.from(
            new Map(allTracks.map((t) => [t.id, t])).values()
          );

          // Map final songs
          const finalSongs = await Promise.all(
            uniqueTracks.map(async (track) => {
              const titleLower = track.name.toLowerCase();

              // Match with local songs
              const match = localSongMap.find(({ title }) =>
                titleLower.includes(title.toLowerCase())
              );

              // Fetch real artist details (first artist only for image)
              const mainArtist = track.artists[0]?.name;
              const artistDetails = mainArtist
                ? await fetchArtist(token, mainArtist)
                : null;

              return {
                id: track.id,
                title: track.name,
                artistName: track.artists.map((a) => a.name).join(", "),
                albumName: track.album.name,
                artwork: track.album.images[0]?.url || "",
                artistImage:
                  artistDetails?.images?.[0]?.url || track.album.images[0]?.url,
                previewUrl: match
                  ? match.src
                  : track.preview_url || defaultSong,
              };
            })
          );

          return { data: finalSongs };
        } catch (err) {
          console.error("Spotify fetch error:", err);
          return { error: { status: "FETCH_ERROR", error: err.message } };
        }
      },
    }),

    // ✅ Get Top Artists (unique, no duplicates)
    getTopArtists: builder.query({
      async queryFn() {
        try {
          const token = await getSpotifyToken(
            SPOTIFY_CLIENT_ID,
            SPOTIFY_CLIENT_SECRET
          );

          const searchQueries = [
            "top artist",
            "latest tamil artist",
            "english artist"
          ];
          const allArtists = [];
          const seen = new Set();

          for (const query of searchQueries) {
            const res = await fetch(
              `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                query
              )}&type=track&limit=20`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const data = await res.json();

            if (data?.tracks?.items) {
              for (const track of data.tracks.items) {
                for (const artist of track.artists) {
                  if (!seen.has(artist.id)) {
                    seen.add(artist.id);

                    // Fetch full artist details
                    const details = await fetchArtist(token, artist.name);

                    if (details) {
                      allArtists.push({
                        id: details.id,
                        name: details.name,
                        image:
                          details.images?.[0]?.url ||
                          track.album.images[0]?.url,
                        genres: details.genres,
                        followers: details.followers,
                        popularity: details.popularity,
                      });
                    }
                  }
                }
              }
            }
          }

          return { data: allArtists };
        } catch (err) {
          console.error("Spotify fetch error (artists):", err);
          return { error: { status: "FETCH_ERROR", error: err.message } };
        }
      },
    }),
  }),
});

export const { useGetTopChartsQuery, useGetTopArtistsQuery } = shazamCoreApi;
