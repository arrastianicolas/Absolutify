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
    <div className="flex flex-col items-center justify-center h-screen mx-auto font-questrial bg-neutral-800 gap-28">
      <h2 className="text-7xl text-slate-300">Pagina No Encontrada!</h2>
      <div className="flex flex-col items-center mb-40">
        <h4 className="text-5xl text-red-300">Error 404!</h4>
        <h4 className="text-5xl text-red-300">Not Found!</h4>
      </div>
      <button
        onClick={handleRedirect}
        className="p-3 text-lg rounded-full bg-cyan-900 text-slate-300 w-96 hover:bg-cyan-800"
      >
        Volver {loged ? "al Dashboard" : "al Inicio"}
      </button>
    </div>
  );
};

export default NotFound;
