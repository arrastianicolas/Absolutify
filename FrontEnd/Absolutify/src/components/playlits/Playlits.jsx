import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import Spinner from "../spinner/Spinner";
import { useTraduction } from "../../custom/TraductionDictionary";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTraduction();
  const fetched = useRef(false);
  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchPlaylists = async () => {
      const token = localStorage.getItem("spotifyAccessToken");
      if (!token) return console.error("No hay token de acceso disponible");

      try {
        const response = await fetch(
          "http://localhost:3308/spotify/playlists",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          }
        );

        if (!response.ok)
          throw new Error("No se pudieron obtener las playlists");

        const data = await response.json();
        setPlaylists(data);
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
      <div className="flex items-center justify-center w-full mx-auto h-[50vh] md:h-auto">
        <div className="grid  relative    w-full max-h-full md:max-h-[600px] xl:max-h-[340px] 2xl:max-h-[700px] md:grid-cols-4 md:gap-6 gap-3 overflow-y-auto md:p-9 p-5">
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
                <div className="2xl:w-[100px] xl:w-[80px] w-[90px]  h-full ">
                  <img
                    src={
                      playlist.images && playlist.images[0]
                        ? playlist.images[0].url
                        : "/png/logoAbso.webp"
                    }
                    alt="Playlist Logo"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>

                <div className="flex justify-start p-4 my-auto w-44">
                  <p className="text-sm font-questrial text-slate-100 2xl:text-lg xl:text-sm">
                    {playlist?.name || "Playlist"}
                  </p>
                </div>

                <div className="absolute p-2 transition-opacity duration-300 transform -translate-y-1/2 rounded-full opacity-0 bg-neutral-500 right-2 md:top-1/2 top-3/4 group-hover:opacity-100">
                  <FaPlay
                    className="relative left-[1px] text-slate-100"
                    size={20}
                  />
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
