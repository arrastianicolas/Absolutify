import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

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
        "https://absolutify.onrender.com/spotify/follow-playlist",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playlist_id: playlist.id }),
        }
      );

      if (!response.ok) {
        toast.error("Error al guardar la Playlist");
      }

      toast.success(`Playlist ${playlist.name} Guardada Correctamente`);
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

      <ul className="w-full">
        {tracks.filter(Boolean).map((item) => {
          if (!item.id || !item.name) return null;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between w-full p-3 border-b rounded-md border-neutral-600"
            >
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
