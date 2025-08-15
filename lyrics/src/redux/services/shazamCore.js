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
import huntervantaar from "../../music/Hunter Vantaar.mp3";
import defaultSong from "../../music/Salambala.mp3";

export const localSongMap = [
  { title: 'Aasa Kooda', src: aasaKooda },
  { title: 'Adi Penne', src: adiPenne },
  { title: 'Benz', src: benz },
  { title: 'Disco', src: disco },
  { title: 'Hey Minnale', src: heyMinnale },
  { title: 'I Am The Danger', src: iAmTheDanger },
  { title: 'Jinguchaa - Thug Life', src: jinguchaaThugLife },
  { title: 'Kanimaa', src: kanimaa },
  { title: 'Katchi Sera', src: katchiSera },
  { title: 'Kissik', src: kissik },
  { title: 'Kokki', src: kokki },
  { title: 'Matta', src: matta },
  { title: 'Mobsta', src: mobsta },
  { title: 'Mundhinam Parthene', src: mundhinamParthene },
  { title: 'Peelings', src: peelings },
  { title: 'Powerhouse', src: powerhouse },
  { title: 'Salambala', src: salambala },
  { title: 'Tamilselvi', src: tamilselvi },
  { title: 'The One - MassTamilan', src: Kannadi },
  { title: 'Thenkizhakku', src: thenkizhakku },
  { title: 'Thuli Thuli', src: thuliThuli },
  { title: 'Vazhithunaiye', src: vazhithunaiye },
  { title: 'Water Packet', src: waterPacket },
  { title: 'Yedi', src: yedi },
  { title: 'Hunter Vantaar', src: huntervantaar }
];

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      async queryFn() {
        try {
          const token = await getSpotifyToken(
            SPOTIFY_CLIENT_ID,
            SPOTIFY_CLIENT_SECRET
          );

          const searchQueries = [
            "tamil",
            "tamil hits",
            "tamil top",
            "kollywood",
            "tamil new"
          ];

          const allTracks = [];

          // Fetch songs from Spotify
          for (const query of searchQueries) {
            const res = await fetch(
              `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            const data = await res.json();
            if (data?.tracks?.items) {
              allTracks.push(...data.tracks.items);
            }
          }

          // Remove duplicate tracks
          const uniqueTracks = Array.from(
            new Map(allTracks.map((t) => [t.id, t])).values()
          );

          // Map final results
          const finalSongs = uniqueTracks.map((track) => {
            const titleLower = track.name.toLowerCase();

            // Find matching local song
            const match = localSongMap.find(({ title }) =>
              titleLower.includes(title.toLowerCase())
            );

            return {
              id: track.id,
              title: track.name,
              artistName: track.artists.map((a) => a.name).join(", "),
              albumName: track.album.name,
              artwork: track.album.images[0]?.url || "",
              previewUrl: match
                ? match.src
                : track.preview_url || defaultSong,
            };
          });

          return { data: finalSongs };
        } catch (err) {
          console.error("Spotify fetch error:", err);
          return { error: { status: "FETCH_ERROR", error: err.message } };
        }
      },
    }),
  }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;
