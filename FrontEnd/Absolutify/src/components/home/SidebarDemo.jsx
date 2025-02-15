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

export function SidebarDemo({ logout }) {
  const { user } = useProfile();

  const links = [
    {
      label: "Mis Playlits",
      to: "/home/playlits",
      icon: (
        <RiPlayListFill className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Perfil",
      to: "/home/perfil",
      icon: (
        <BsPersonFill className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Configuracion",
      to: "/home/configuracion",
      icon: (
        <DiAptana className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Cerrar Sesion",
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
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-500 w-full flex-1 mx-auto   overflow-hidden",
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
      <div className="flex flex-col flex-1 w-full h-full gap-2 p-1 mx-auto bg-white border rounded-tl-2xl dark:border-neutral-900 dark:bg-neutral-900">
        <Nav />
        <div className="flex gap-2">
          <Outlet />
        </div>

        {location.pathname === "/home" && (
          <>
            <div className="grid justify-center grid-rows-2  max-h-[500px] space-y-32">
              <div className="flex items-center justify-center gap-32 my-44">
                <div className="flex flex-col items-center justify-center gap-4 ">
                  <iframe
                    className="flex mx-auto rounded-2xl 2xl:w-[900px] xl:w-[600px] 2xl:h-[360px] xl:h-[300px]  mt-8"
                    src="https://open.spotify.com/embed/playlist/37i9dQZEVXbMMy2roB9myp?utm_source=generator&theme=0"
                    width="100%"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="flex flex-col items-center justify-center gap-5 mb-5">
                  <h2 className="2xl:text-3xl xl:text-2xl text-slate-300 font-questrial">
                    Mi top Artistas
                  </h2>
                  <div className="grid w-full h-auto grid-cols-2 gap-10 mx-auto rounded-xl">
                    {artistsTop
                      ? artistsTop.map((artist) => (
                          <motion.div
                            className="relative 2xl:w-[160px] 2xl:h-[160px] xl:w-[130px] xl:h-[130px] overflow-x-hidden rounded-xl"
                            key={artist.id}
                            whileHover={{ y: "-10%" }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                          >
                            {/* Imagen con efecto de oscurecimiento */}
                            <motion.img
                              src={artist.images[0].url}
                              alt={artist.name}
                              className="object-cover w-full h-full max-h-[200px]"
                              whileHover={{ opacity: 0.5 }}
                            />

                            {/* Nombre del artista (oculto por defecto) */}
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center text-lg bg-black bg-opacity-50 opacity-0 text-slate-300"
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              {artist.name}
                            </motion.div>
                          </motion.div>
                        ))
                      : "a"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center 2xl:h-[280px] xl:h-[150px] max-w-[1500px]  overflow-y-hidden ">
                <h2 className="relative text-2xl 2xl:text-3xl 2xl:mt-8 bottom-2 text-slate-300 font-questrial">
                  Nuevos Albunes
                </h2>
                <motion.div
                  className="flex w-full gap-5"
                  whileHover={{ x: "-50%" }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                >
                  {newReleases
                    ? newReleases.map((releases) => (
                        <div
                          className="2xl:w-[500px] 2xl:h-[200px] xl:w-[100px] xl:h-[100px]"
                          key={releases.id}
                        >
                          <img
                            src={releases.images[0].url}
                            alt="nuevos albunes"
                            className="object-fill w-full h-full rounded-lg"
                          />
                        </div>
                      ))
                    : "a"}
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
