import { useEffect, useState } from "react";
import { SidebarDemo } from "./SidebarDemo";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useProfile } from "../../contexts/UserContext";
import Spinner from "../spinner/Spinner";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["spotifyAccessToken"]);
  const { fetchPerfil } = useProfile();
  const token = cookies.spotifyAccessToken;

  useEffect(() => {
    if (token) {
      localStorage.setItem("isLoggedIn", "true");
      checkTokenValidity(token);
    } else {
      console.error("No se encontró el token de acceso");
      logout(); // Cerrar sesión si no hay token
    }
  }, [token]); // Se actualiza solo cuando cambia el token

  useEffect(() => {
    setLoading(true);
    if (token) {
      fetchPerfil().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const logout = async () => {
    try {
      const response = await fetch("https://absolutify.onrender.com/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        // Eliminar solo el estado en localStorage
        localStorage.removeItem("isLoggedIn");

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
        credentials: "include",
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
      const response = await fetch(
        "https://absolutify.onrender.com/spotify/refresh",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Error al refrescar el token");

      return true;
    } catch (error) {
      console.error("No se pudo refrescar el token:", error);
      return false;
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="h-screen bg-neutral-900 ">
      <SidebarDemo logout={logout} />
      <ToastContainer />
    </div>
  );
};

export default Home;
