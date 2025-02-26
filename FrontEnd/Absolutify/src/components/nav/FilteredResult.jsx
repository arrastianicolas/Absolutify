import { useCookies } from "react-cookie";

const FilteredResult = ({
  tracks,
  handlePlayTrack,
  setFilterType,
  currentFilter,
}) => {
  const [cookies] = useCookies(["spotifyAccessToken"]);

  const handleSavePlaylist = async (playlist) => {
    const token = cookies.spotifyAccessToken;

    if (!token) {
      alert("No estás autenticado.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3308/spotify/follow-playlist",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json", // Agregar para que el backend pueda leer el JSON
          },
          body: JSON.stringify({ playlist_id: playlist.id }), // Cambiar `playlistId` a `playlist_id`
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo guardar la playlist");
      }

      alert("¡Playlist guardada con éxito!");
    } catch (error) {
      console.error("Error al guardar la playlist:", error);
      alert("Hubo un problema al guardar la playlist.");
    }
  };
  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center w-full max-w-[500px] bg-neutral-800 rounded-lg shadow-lg">
      {/* Botones de filtro */}
      <div className="flex gap-4 p-3 border-b-2 border-neutral-500">
        {["track", "album", "playlist"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-2 py-1 font-bold text-black transition-all border border-black rounded-full ${
              currentFilter === type
                ? "bg-stone-400"
                : "bg-white hover:bg-stone-500"
            }`}
          >
            {type === "track"
              ? "Canciones"
              : type === "album"
              ? "Álbumes"
              : "Playlists"}
          </button>
        ))}
      </div>

      {/* Lista de resultados (Filtra valores null o undefined) */}
      <ul className="w-full">
        {tracks.filter(Boolean).map((item) => {
          // Si el item no tiene datos esenciales, lo ignoramos
          if (!item.id || !item.name) return null;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between w-full p-3 border-b rounded-md border-neutral-600"
            >
              {/* 🎵 Si es una Canción (track) */}
              {currentFilter === "track" && item.album && (
                <>
                  <div className="max-w-[60px] max-h-[79px]">
                    <img
                      src={item.album.images?.[0]?.url || "/png/logo.png"}
                      alt="Track Cover"
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col flex-1 px-4 my-auto ">
                    <p className="font-semibold text-left text-slate-100">
                      {item.name}
                    </p>
                    <p className="text-sm text-slate-300">
                      {" "}
                      {item.artists?.map((artist) => artist.name).join(", ")}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePlayTrack(item)}
                    className="px-2 py-1 font-bold text-black transition-all bg-white border border-black rounded-full hover:bg-stone-300"
                  >
                    Play
                  </button>
                </>
              )}

              {/* 💿 Si es un Álbum */}
              {currentFilter === "album" && item.images && (
                <>
                  <div className="w-16 h-16">
                    <img
                      src={item.images?.[0]?.url || "/png/logo.png"}
                      alt="Album Cover"
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col flex-1 px-4">
                    <p className="text-lg font-semibold text-slate-100">
                      {item.name}
                    </p>
                    <p className="text-sm text-slate-300">
                      {item.artists?.[0]?.name}
                    </p>
                  </div>
                </>
              )}

              {/* 📋 Si es una Playlist */}
              {currentFilter === "playlist" && item.images && (
                <>
                  <div className="w-16 h-16">
                    <img
                      src={
                        item.images.length > 0
                          ? item.images[0].url
                          : "/png/logo.png"
                      }
                      alt="Playlist Cover"
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col flex-1 px-4">
                    <p className="text-lg font-semibold text-slate-100">
                      {item.name}
                    </p>
                    <p className="text-sm text-slate-300">
                      By {item.owner?.display_name || "Desconocido"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSavePlaylist(item)}
                    className="px-2 py-1 font-bold text-black transition-all bg-white border border-black rounded-full hover:bg-stone-300"
                  >
                    Guardar
                  </button>
                </>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default FilteredResult;
