import { useEffect } from "react";
import { SidebarDemo } from "./SidebarDemo";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { ToastContainer } from "react-toastify";
import { useProfile } from "../../contexts/UserContext";

const Home = () => {
  const navigate = useNavigate();
  const { fetchPerfil } = useProfile();
  const [cookies] = useCookies(["spotifyAccessToken"]);

  useEffect(() => {
    const token = cookies.spotifyAccessToken;

    if (token) {
      localStorage.setItem("spotifyAccessToken", token);
      localStorage.setItem("isLoggedIn", "true");
      checkTokenValidity(token);
    } else {
      console.error("No se encontró el token de acceso");
      logout();
    }
  }, [cookies]);
  useEffect(() => {
    fetchPerfil();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3308/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("spotifyAccessToken");
        localStorage.removeItem("isLoggedIn");

        document.cookie =
          "spotifyAccessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie =
          "spotifyRefreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";

        navigate("/");
      } else {
        console.error("Error al hacer logout:", await response.json());
      }
    } catch (error) {
      console.error("Error en la solicitud de logout:", error);
    }
  };

  const checkTokenValidity = async (token) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        console.warn("Token expirado, intentando refrescar...");

        const refreshed = await refreshToken();
        if (!refreshed) {
          logout();
        }
      }
    } catch (error) {
      console.error("Error al verificar el token:", error);
      logout();
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch("http://localhost:3308/spotify/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Error al refrescar el token");

      const data = await response.json();
      console.log("Nuevo token recibido:", data.access_token);

      document.cookie = `spotifyAccessToken=${data.access_token}; path=/; max-age=3600`;
      localStorage.setItem("spotifyAccessToken", data.access_token);
      return true;
    } catch (error) {
      console.error("No se pudo refrescar el token:", error);
      return false;
    }
  };

  return (
    <div className="h-screen bg-neutral-900">
      <SidebarDemo logout={logout} />
      <ToastContainer />
    </div>
  );
};

export default Home;
