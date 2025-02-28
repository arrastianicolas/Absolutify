import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchPerfil = async () => {
    const token = localStorage.getItem("spotifyAccessToken");

    if (!token) {
      console.error("No hay token de acceso disponible");
      return;
    }

    try {
      const response = await fetch("http://localhost:3308/spotify/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("No se pudo obtener el perfil");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Error al obtener el perfil:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        fetchPerfil,
        setUser,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useProfile = () => useContext(UserContext);
