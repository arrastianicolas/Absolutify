import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { RiPlayListFill } from "react-icons/ri";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../nav/Nav";
import { cn } from "../../lib/utils";
import { useLocation } from "react-router-dom";
import MusicPlayerSlider from "../musicPlay/MusicPlay";
import { BsPersonFill } from "react-icons/bs";
import { DiAptana } from "react-icons/di";

import { GoArrowLeft } from "react-icons/go";

import { useProfile } from "../../contexts/UserContext";
import { useTraduction } from "../../custom/TraductionDictionary";

export function SidebarDemo({ logout }) {
  const { user } = useProfile();
  const { t } = useTraduction();

  const links = [
    {
      label: t("playlists"),
      to: "/home/playlits",
      icon: (
        <RiPlayListFill className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: t("perfil"),
      to: "/home/perfil",
      icon: (
        <BsPersonFill className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: t("configuracion"),
      to: "/home/configuracion",
      icon: (
        <DiAptana className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: t("logout"),
      onClick: logout,

      icon: (
        <GoArrowLeft className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row   w-full flex-1 mx-auto   overflow-hidden",
        "h-full"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
            <div className="">
              <Logo />
            </div>
            <div className="flex flex-col gap-2 mt-8">
              {links.map((link) =>
                link.onClick ? (
                  <SidebarLink
                    key={link.label}
                    onClick={link.onClick}
                    link={link}
                  >
                    {link.icon} {link.label}
                  </SidebarLink>
                ) : (
                  <SidebarLink key={link.label} link={link} />
                )
              )}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user?.display_name,
                to: "/home/perfil",
                icon: (
                  <img
                    src={user?.images?.[0]?.url || "/png/logo.png"}
                    className="flex-shrink-0 object-cover rounded-full h-7 w-7"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      to="/home"
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
    >
      <img
        className="flex-shrink-0 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg h-7 w-7 dark:bg-stone-300"
        src="/png/logo.png"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black whitespace-pre font-questrial dark:text-white"
      >
        Absolutify
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
    >
      <div className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
    </Link>
  );
};

const Dashboard = () => {
  const location = useLocation();
  const { user } = useProfile();
  const [newReleases, setNewReleases] = useState([]);
  const [artistsTop, setArtistsTop] = useState([]);
  const { t } = useTraduction();
  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem("spotifyAccessToken");
      if (!token) return;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/browse/new-releases?limit=10&country=${user.country}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Error al obtener recomendaciones");

        const data = await response.json();

        setNewReleases(data.albums.items);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecommendations();
  }, []);

  useEffect(() => {
    const fetchTopArtist = async () => {
      const token = localStorage.getItem("spotifyAccessToken");
      if (!token) return;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/top/artists?limit=4`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Error al obtener recomendaciones");

        const data = await response.json();

        setArtistsTop(data.items);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTopArtist();
  }, []);

  return (
    <div className="flex flex-1 ">
      <div className="flex flex-col flex-1 w-full h-full gap-2 p-1 mx-auto border border-neutral-900 rounded-tl-2xl bg-neutral-900">
        <Nav />
        <div className="flex gap-2">
          <Outlet />
        </div>

        {location.pathname === "/home" && (
          <>
            <div className="grid justify-center max-h-[500px] grid-rows-2 xl:space-y-20 2xl:space-y-44 overflow-y-scroll md:overflow-visible md:max-h-[400px]">
              <div className="grid items-center justify-center gap-2 md:flex md:gap-32 md:my-44 ">
                <div className="flex flex-col items-center justify-center gap-4 ">
                  <iframe
                    className="flex mx-auto rounded-2xl 2xl:w-[900px] xl:w-[500px] 2xl:h-[360px] xl:h-[300px] h-[450px] md:mt-8"
                    src="https://open.spotify.com/embed/playlist/37i9dQZEVXbMMy2roB9myp?utm_source=generator&theme=0"
                    width="100%"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="relative flex flex-col items-center justify-center gap-4 md:gap-11 2xl:top-4 top-4 md:top-0">
                  <h2 className="text-2xl 2xl:text-3xl text-slate-300 font-questrial">
                    {t("artists")}
                  </h2>
                  <div className="grid w-full h-auto grid-cols-2 gap-5 mx-auto 2xl:gap-10 xl:gap-7 rounded-xl">
                    {artistsTop.map((artist) => (
                      <motion.div
                        className="relative 2xl:w-[160px] 2xl:h-[160px] xl:w-[120px] xl:h-[120px] w-[160px] h-[160px] xl:bottom-10 overflow-x-hidden rounded-xl"
                        key={artist.id}
                        whileHover={{ y: "-10%" }}
                        transition={{ duration: 5, ease: "easeInOut" }}
                      >
                        <motion.img
                          src={artist.images[0].url}
                          alt={artist.name}
                          className="object-cover w-full h-full max-h-[200px] rounded-xl"
                          whileHover={{ opacity: 0.5 }}
                        />

                        <motion.div
                          className="absolute inset-0 flex items-center justify-center text-lg bg-black bg-opacity-50 opacity-0 text-slate-300"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {artist.name}
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:flex hidden flex-col items-center justify-center 2xl:h-[280px] xl:h-[150px] h-[900px] 2xl:max-w-[1900px] xl:nax-w-[1500px] overflow-x-hidden md:overflow-y-hidden  ">
                <h2 className="relative text-2xl 2xl:text-3xl 2xl:mt-8 bottom-2 text-slate-300 font-questrial">
                  {t("albunes")}
                </h2>
                <motion.div
                  className="flex w-full gap-5"
                  whileInView={{ x: "-50%" }}
                  transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  {newReleases.map((releases) => (
                    <div
                      className="2xl:w-[250px] 2xl:h-[200px] xl:w-[100px] xl:h-[100px]"
                      key={releases.id}
                    >
                      <img
                        src={releases.images[0].url}
                        alt="nuevos albunes"
                        className="object-fill w-full h-full rounded-lg"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </>
        )}
        <div className="flex flex-1 gap-2"></div>
        <MusicPlayerSlider />
      </div>
    </div>
  );
};
