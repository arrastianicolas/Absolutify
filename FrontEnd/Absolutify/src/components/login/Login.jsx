import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const fetchLoginSpotify = () => {
    window.location.href = "http://localhost:3308/spotify/login";
  };

  return (
    <div className="relative flex items-center justify-center h-screen">
      {/* Fondo */}
      <img
        src="/png/logo.png"
        className="absolute inset-0 object-cover w-full h-full"
        alt="Fondo"
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"></div>

      {/* Contenido */}
      <div className="relative z-10 max-w-4xl px-6 text-center">
        <h1 className="text-6xl font-light text-white">
          ¡Bienvenidos a Absolutify!
        </h1>
        <p className="mt-6 text-lg leading-7 text-gray-300">
          Absolutify es un proyecto de práctica de Front-End que utiliza la{" "}
          <span className="font-semibold text-white">API de Spotify</span> para
          ofrecer una experiencia interactiva de música en línea. Explora
          playlists, artistas favoritos y el Top 50 de tu región con previews y
          detalles de cada track, álbum y artista.
        </p>
        <button
          className="px-8 py-3 mt-10 text-lg text-white transition-all rounded-lg shadow-md font-questrial bg-cyan-900 hover:bg-neutral-500"
          onClick={fetchLoginSpotify}
        >
          Continuar
        </button>
        <p className="mt-6 text-sm italic text-gray-400">
          Este proyecto utiliza la API de Spotify, pero no está afiliado ni
          respaldado por Spotify. Todos los derechos sobre la música y los datos
          pertenecen a Spotify y sus respectivos propietarios.
        </p>
      </div>
    </div>
  );
};

export default Login;
