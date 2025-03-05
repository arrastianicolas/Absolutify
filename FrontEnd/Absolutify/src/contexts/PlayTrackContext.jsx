import { createContext, useContext, useState } from "react";

const PlaybackContext = createContext();

export const PlaybackProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [currentArtistId, setCurrentArtistId] = useState(null);
  const playTrack = async (trackId) => {
    const accessToken = localStorage.getItem("spotifyAccessToken");
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos de reproducción.");
      }

      const playbackInfo = await response.json();

      setCurrentTrack(playbackInfo);
    } catch (error) {
      console.error("Error al reproducir la pista:", error);
    }
  };

  return (
    <PlaybackContext.Provider
      value={{
        currentTrack,
        playTrack,

        currentTrackId,
        setCurrentTrackId,
        setCurrentArtistId,
        currentArtistId,
        setCurrentTrack,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};

export const usePlayback = () => useContext(PlaybackContext);
