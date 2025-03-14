import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTraduction } from "../../custom/TraductionDictionary";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTraduction();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const fetchLoginSpotify = () => {
    window.location.href =
      "http://localhost:3308/spotify/login?show_dialog=true";
  };

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      <img
        src="/png/logoAbso.webp"
        className="absolute inset-0 object-cover w-full h-full"
        alt="Fondo Abso"
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-4xl px-6 text-center">
        <h1 className="text-5xl font-light text-white md:text-6xl">
          {t("welcome")}
        </h1>
        <p className="mt-6 leading-7 text-gray-300 md:text-lg">{t("loginP")}</p>
        <button
          className="px-8 py-3 mt-10 text-lg text-white transition-all rounded-lg shadow-md font-questrial bg-cyan-900 hover:bg-cyan-800"
          onClick={fetchLoginSpotify}
        >
          {t("continuar")}
        </button>
        <p className="mt-6 text-xs italic text-gray-400 md:text-sm">
          {t("avisoP")}
        </p>
      </div>
    </div>
  );
};

export default Login;
