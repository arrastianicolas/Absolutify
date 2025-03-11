import { createContext, useContext, useEffect, useState } from "react";

export const TraductionDictionaryContext = createContext();

export const TraductionDictionaryProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("Language") || "es";
  });

  useEffect(() => {
    localStorage.setItem("Language", language);
  }, [language]);

  const traduction = {
    es: {
      configuracion: "Configuración",
      cuenta: "Cuenta",
      idioma: "Idioma",
      editar: "Editar",
      perfil: "Perfil",
      seguidores: "Seguidores",
      playlists: "Mis Playlists",
      cancion: "Canción",
      artists: "Tus Artistas favoritos",
      tracks: "Tus Canciones favoritas",
      albunes: "Nuevos Albunes",
      placeHolder: "¿Qué Quieres Escuchar?",
      logout: "Cerrar Sesión",
      continuar: "Continuar",
      español: "Español",
      ingles: "Ingles",
      welcome: "¡Bienvenidos a Absolutify!",
      loginP:
        "Absolutify es un proyecto de práctica de Front-End que utiliza la API de Spotify para ofrecer una experiencia interactiva de música en línea. Explora playlists, artistas favoritos y canciones.",
      avisoP:
        "Este proyecto utiliza la API de Spotify, pero no está afiliado ni respaldado por Spotify. Todos los derechos sobre la música y los datos pertenecen a Spotify y sus respectivos propietarios.",
      filterCancion: "Canciones",
      filterAlbumes: "Álbumes",
    },
    en: {
      configuracion: "Configuration",
      cuenta: "Account",
      idioma: "Language",
      editar: "Edit",
      perfil: "My User",
      seguidores: "Followers",
      playlists: "My Playlists",
      cancion: "Track",
      artists: "Your top Artists",
      tracks: "Your top Tracks",
      albunes: "New Albuns",
      placeHolder: "What do you want to hear?",
      logout: "Logout",
      continuar: "Continue",
      español: "Spanish",
      ingles: "English",
      welcome: "Welcome to Absolutify!",
      loginP:
        "Absolutify is a Front-End practice project that uses the Spotify API to deliver an interactive online music experience. Explore playlists, favorite artists and the Top 50 in Argentina with previews and details for each track, album and artist.",
      avisoP:
        "This project uses the Spotify API but is not affiliated with or endorsed by Spotify. All rights to music and data belong to Spotify and their respective owners.",
      filterCancion: "Tracks",
      filterAlbumes: "Albums",
    },
  };

  const t = (key) => traduction[language][key] || key;

  return (
    <TraductionDictionaryContext.Provider value={{ t, setLanguage }}>
      {children}
    </TraductionDictionaryContext.Provider>
  );
};

export const useTraduction = () => useContext(TraductionDictionaryContext);
