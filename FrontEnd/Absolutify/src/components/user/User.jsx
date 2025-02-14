import { useProfile } from "../../contexts/UserContext";

const User = () => {
  const { user } = useProfile();

  return (
    <div className="flex justify-center w-full h-full mx-auto">
      <div className="grid justify-center w-full mx-auto bg-gradient-to-b from-transparent via-stone-800 to-neutral-500 rounded-xl">
        <h2 className="my-6 text-4xl text-center text-white font-questrial">
          Perfil
        </h2>
        <div className="w-[200px] h-[200px] rounded-xl mx-auto my-4">
          <img
            src={user?.images?.[0]?.url || "/png/logo.png"}
            alt="Imagen de perfil"
            className="object-fill w-full h-full rounded-full"
          />
        </div>
        <p className="font-bold text-center text-7xl text-stone-400">
          {user?.display_name}
        </p>
        <p className="my-4 text-lg text-center text-stone-500">
          Seguidores: {user?.followers.total}
        </p>

        <div className="flex items-center justify-center mx-auto my-4">
          <div className="flex items-center justify-center p-4 mx-auto rounded-full bg-zinc-900">
            <p className="text-lg text-slate-300">
              {user?.email || "No disponible"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
