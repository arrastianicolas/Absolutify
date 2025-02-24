import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa"; // Asegúrate de tener react-icons instalado
import Spinner from "../spinner/Spinner";
import { useTraduction } from "../../custom/TraductionDictionary";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTraduction();
  useEffect(() => {
    // Función para obtener las playlists
    const fetchPlaylists = async () => {
      const token = localStorage.getItem("spotifyAccessToken");

      if (!token) {
        console.error("No hay token de acceso disponible");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3308/spotify/playlists",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Enviar el token en los headers
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("No se pudieron obtener las playlists");
        }

        const data = await response.json();
        setPlaylists(data); // Guardar las playlists en el estado
      } catch (err) {
        console.error("Error al obtener las playlists:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="grid justify-center mx-auto">
      <h1 className="w-full text-3xl text-left text-white 2xl:text-4xl font-questrial">
        {t("playlists")}
      </h1>
      <div className="flex items-center justify-center w-full mx-auto">
        <div className="grid  w-full 2xl:max-h-[600px] xl:max-h-[340px] max-h-[700px] md:grid-cols-4 gap-6 overflow-y-auto p-9 ">
          {playlists.length === 0 ? (
            <p className="flex justify-center mx-auto text-4xl text-white font-questrial">
              No tienes playlists
            </p>
          ) : (
            playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-stone-200 bg-opacity-20 rounded-lg 2xl:w-[350px] xl:w-[250px] xl:h-[78px] 2xl:h-[100px] h-20 flex justify-start items-center hover:scale-110 hover:cursor-pointer transition-all relative group"
              >
                <div className="2xl:w-[100px] xl:w-[80px] w-[90px] h-full ">
                  <img
                    src={
                      playlist.images && playlist.images[0]
                        ? playlist.images[0].url
                        : "/png/logo.png"
                    }
                    alt="Playlist Logo"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>

                <div className="flex justify-start p-4 my-auto">
                  <p className="font-questrial text-slate-100 2xl:text-lg xl:text-sm">
                    {playlist?.name || "Playlist"}
                  </p>
                </div>

                <div className="absolute transition-opacity duration-300 transform -translate-y-1/2 opacity-0 right-4 md:top-1/2 top-3/4 group-hover:opacity-100">
                  <FaPlay className="text-slate-100" size={20} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
