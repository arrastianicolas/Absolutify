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
      artists: "Tus Artistas Favoritos",
      albunes: "Nuevos Albunes",
      placeHolder: "¿Qué Quieres Escuchar?",
      logout: "Cerrar Sesión",
      continuar: "Continuar",
      español: "Español",
      ingles: "Ingles",
      welcome: "¡Bienvenidos a Absolutify!",
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
      albunes: "New Albuns",
      placeHolder: "What do you want to hear?",
      logout: "Logout",
      continuar: "Continue",
      español: "Spanish",
      ingles: "English",
      welcome: "Welcome to Absolutify!",
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
