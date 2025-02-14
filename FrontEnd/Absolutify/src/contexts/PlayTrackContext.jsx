import { createContext, useContext, useState } from "react";

const PlaybackContext = createContext();

export const PlaybackProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null); // Información de la pista actual
  const [audio, setAudio] = useState(null); // Instancia de Audio
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

      if (playbackInfo.previewUrl) {
        // Si ya hay una pista reproduciéndose, deténla antes de iniciar una nueva
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }

        // Configura y reproduce la nueva pista
        const newAudio = new Audio(playbackInfo.previewUrl);

        setAudio(newAudio); // Guarda la instancia de audio para control futuro
        setCurrentTrack(playbackInfo); // Guarda la información de la pista actual
      }

      setCurrentTrack(playbackInfo);
    } catch (error) {
      console.error("Error al reproducir la pista:", error);
    }
  };

  const stopTrack = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
      setCurrentTrack(null);
    }
  };

  return (
    <PlaybackContext.Provider
      value={{
        currentTrack,
        playTrack,
        stopTrack,
        currentTrackId,
        setCurrentTrackId,
        setCurrentArtistId,
        currentArtistId,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};

export const usePlayback = () => useContext(PlaybackContext);
