import { useTraduction } from "../../custom/TraductionDictionary";
import { motion } from "framer-motion";

const TracksTop = ({ tracksTop }) => {
  const { t } = useTraduction();

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 md:gap-11 md:top-0">
      <h2 className="text-2xl 2xl:text-3xl text-slate-300 font-questrial">
        {t("tracks")}
      </h2>
      <div className="grid w-full h-auto grid-cols-2 gap-5 mx-auto 2xl:gap-10 xl:gap-7 rounded-xl">
        {tracksTop.map((track) => (
          <motion.div
            key={track.id}
            className="relative 2xl:w-[160px] 2xl:h-[160px] xl:w-[120px] xl:h-[120px] w-[160px] h-[160px] overflow-hidden rounded-xl"
          >
            <motion.img
              src={track.album.images[0].url}
              alt={track.album.name}
              className="object-cover w-full h-full max-h-[200px] rounded-xl"
              whileHover={{ opacity: 0.5 }}
            />

            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-lg bg-black bg-opacity-50 opacity-0 text-slate-300"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>{track.album.name}</p>
              <a
                href={track.album.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-sm underline hover:text-green-400"
              >
                Escuchar en Spotify
              </a>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TracksTop;
