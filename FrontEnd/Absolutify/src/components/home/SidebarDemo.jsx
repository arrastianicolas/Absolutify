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
import ArtistTop from "./ArtistTop";
import TracksTop from "./TracksTop";

export function SidebarDemo({ logout }) {
  const { user } = useProfile();
  const { t } = useTraduction();

  const links = [
    {
      label: t("playlists"),
      to: "/home/playlists",
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
                    src={user?.images?.[0]?.url || "/png/logoAbso.webP"}
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
        src="/png/logoAbso.webp"
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
      to="#"
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
    >
      <div className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
    </Link>
  );
};

const Dashboard = () => {
  const location = useLocation();
  const [tracksTop, setTracksTop] = useState([]);
  const [artistsTop, setArtistsTop] = useState([]);

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
  useEffect(() => {
    const fetchTopTracks = async () => {
      const token = localStorage.getItem("spotifyAccessToken");
      if (!token) return;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/top/tracks?limit=4`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Error al obtener recomendaciones");

        const data = await response.json();
        const tracks = data.items.filter((item) => item.type === "track");
        setTracksTop(tracks);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTopTracks();
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full h-full gap-2 p-1 mx-auto border border-neutral-900 rounded-tl-2xl bg-neutral-900">
      <Nav />
      <div className="flex gap-1">
        <Outlet />
      </div>

      {location.pathname === "/home" && (
        <>
          <div className="grid bg-neutral-800 border border-stone-500 mx-auto p-3 rounded-xl  items-center justify-center md:max-h-[800px] max-h-[550px] 2xl:my-20 xl:my-10 md:overflow-hidden overflow-y-scroll grid-cols-1 gap-2">
            <div className="grid justify-center gap-10 mx-auto md:gap-20 md:flex ">
              <ArtistTop artistsTop={artistsTop} />
              <TracksTop tracksTop={tracksTop} />
            </div>
          </div>
        </>
      )}
      <div className="flex flex-1 gap-2"></div>
      <MusicPlayerSlider />
    </div>
  );
};
