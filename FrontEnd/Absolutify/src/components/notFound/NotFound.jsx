import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const loged = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (loged) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto overflow-hidden bg-neutral-800">
      <h1 className="text-neutral-500 text-center md:text-[500px] text-[250px] leading-none relative md:top-12 top-7">
        404
      </h1>
      <div className="flex flex-col items-center justify-center w-full gap-10 mx-auto min-h-96 bg-gradient-to-b from-neutral-500 via-neutral-600 to-neutral-800">
        <h2 className="text-5xl text-center text-neutral-900 font-extralight">
          Lo siento, página no encontrada
        </h2>
        <button
          onClick={handleRedirect}
          className="p-3 text-lg rounded-full bg-cyan-900 text-slate-300 w-80 hover:bg-cyan-800"
        >
          VOLVER {loged ? "AL INICIO" : "AL BIENVENIDOS"}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
