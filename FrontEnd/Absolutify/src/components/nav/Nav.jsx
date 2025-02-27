import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { usePlayback } from "../../contexts/PlayTrackContext";
import { useTraduction } from "../../custom/TraductionDictionary";
import FilteredResult from "./FilteredResult";

const Nav = () => {
  const [showFind, setShowFind] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("track"); // Estado para el filtro
  const { setCurrentTrackId, setCurrentArtistId } = usePlayback();
  const { t } = useTraduction();

  // Estado para almacenar el último término buscado con debounce
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 1) {
      fetchTracks(debouncedSearchTerm, filterType);
    } else {
      setTracks([]);
      setShowFind(false);
    }
  }, [debouncedSearchTerm, filterType]);

  const fetchTracks = async (query, type) => {
    const token = localStorage.getItem("spotifyAccessToken");

    if (!token) {
      console.error("No hay token de acceso disponible");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3308/spotify/search?q=${encodeURIComponent(
          query
        )}&type=${type}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("No se pudieron obtener las tracks");
      const spotifyType = type + "s"; // "track" -> "tracks"
      const data = await response.json();

      const results = data[spotifyType]?.items || [];

      setTracks(results);

      setShowFind(results.length > 0);
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
        <FilteredResult
          tracks={tracks}
          handlePlayTrack={handlePlayTrack}
          setFilterType={setFilterType} // Pasamos la función para cambiar el filtro
          currentFilter={filterType} // Pasamos el filtro actual
        />
      )}
    </div>
  );
};

export default Nav;
