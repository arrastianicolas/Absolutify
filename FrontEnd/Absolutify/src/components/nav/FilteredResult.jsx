const FilteredResult = ({
  tracks,
  handlePlayTrack,
  setFilterType,
  currentFilter,
}) => {
  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center w-full max-w-[500px] bg-neutral-800 rounded-lg shadow-lg">
      {/* Botones de filtro */}
      <div className="flex gap-4 p-3 border-b-2 border-neutral-500">
        <button
          onClick={() => setFilterType("track")}
          className={`px-2 py-1 font-bold text-black transition-all border border-black rounded-full ${
            currentFilter === "track"
              ? "bg-stone-500"
              : "bg-white hover:bg-stone-500"
          }`}
        >
          Canciones
        </button>
        <button
          onClick={() => setFilterType("album")}
          className={`px-2 py-1 font-bold text-black transition-all border border-black rounded-full ${
            currentFilter === "album"
              ? "bg-stone-500"
              : "bg-white hover:bg-stone-500"
          }`}
        >
          Álbumes
        </button>
        <button
          onClick={() => setFilterType("playlist")}
          className={`px-2 py-1 font-bold text-black transition-all border border-black rounded-full ${
            currentFilter === "playlist"
              ? "bg-stone-500"
              : "bg-white hover:bg-stone-500"
          }`}
        >
          Playlists
        </button>
      </div>

      {/* Lista de resultados */}
      <ul>
        {tracks.map((track) => (
          <div
            className="flex items-center justify-between max-w-[500px] p-3"
            key={track.id}
          >
            <div className="max-w-[60px] max-h-[79px]">
              <img
                src={track.album?.images?.[0]?.url || "/png/logo.png"}
                alt="Playlist Logo"
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex justify-start flex-1 p-4 my-auto">
              <p className="text-left font-questrial text-slate-100">
                {track.name} -{" "}
                {track.artists
                  ? track.artists.map((artist) => artist.name).join(", ")
                  : ""}
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
  );
};

export default FilteredResult;
