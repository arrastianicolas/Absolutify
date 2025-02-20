import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { usePlayback } from "../../contexts/PlayTrackContext";
import { useTraduction } from "../../custom/TraductionDictionary";

const Nav = () => {
  const [showFind, setShowFind] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { setCurrentTrackId, setCurrentArtistId } = usePlayback();
  const { t } = useTraduction();

  // Estado para almacenar el último término buscado con debounce
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Espera 300ms antes de actualizar

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 1) {
      fetchTracks(debouncedSearchTerm);
    } else {
      setTracks([]);
      setShowFind(false);
    }
  }, [debouncedSearchTerm]);

  const fetchTracks = async (query) => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No hay token de acceso disponible");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3308/spotify/search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("No se pudieron obtener las tracks");

      const data = await response.json();
      setTracks(data);
      setShowFind(data.length > 0);
    } catch (err) {
      console.error("Error al obtener las tracks", err);
      setTracks([]);
      setShowFind(false);
    }
  };

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePlayTrack = (track) => {
    setSearchTerm("");
    setCurrentTrackId(track.id);
    setShowFind(false);

    if (track.artists.length > 0) {
      setCurrentArtistId(track.artists[0].id);
    }
  };

  return (
    <div className="relative w-full max-w-[500px] flex justify-center mx-auto">
      <IoIosSearch className="absolute text-xl transform -translate-y-1/2 left-3 top-1/2 text-stone-600" />
      <input
        placeholder={t("placeHolder")}
        className="w-full p-2 pl-10 border-2 focus:outline-none bg-stone-300 font-questrial border-stone-700 rounded-2xl placeholder:text-stone-900"
        onChange={handleChangeSearch}
        value={searchTerm}
      />
      {showFind && tracks.length > 0 && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center w-full max-w-[500px] bg-neutral-800 rounded-lg shadow-lg">
          <ul>
            {tracks.map((track) => (
              <div
                className="flex items-center justify-between max-w-[500px] p-3"
                key={track.id}
              >
                <div className="max-w-[60px] max-h-[79px]">
                  <img
                    src={track.album.images?.[0]?.url || "/png/logo.png"}
                    alt="Playlist Logo"
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex justify-start flex-1 p-4 my-auto">
                  <p className="text-left font-questrial text-slate-100">
                    {track.name} -{" "}
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handlePlayTrack(track)}
                    className="px-2 py-1 font-bold text-black transition-all bg-white border border-black rounded-full hover:bg-stone-500"
                  >
                    Play
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
