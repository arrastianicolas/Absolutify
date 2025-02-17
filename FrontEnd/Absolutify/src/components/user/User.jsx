import { useProfile } from "../../contexts/UserContext";

const User = () => {
  const { user } = useProfile();

  return (
    <div className="flex justify-center w-full mx-auto 2xl:h-full xl:h-80">
      <div className="grid justify-center w-full mx-auto rounded-xl">
        <h2 className="my-6 text-2xl text-center text-white 2xl:text-4xl font-questrial">
          Perfil
        </h2>
        <div className="2xl:w-[200px] 2xl:h-[200px]  xl:w-[120px] xl:h-[120px] rounded-xl mx-auto my-4">
          <img
            src={user?.images?.[0]?.url || "/png/logo.png"}
            alt="Imagen de perfil"
            className="object-fill w-full h-full rounded-full"
          />
        </div>
        <p className="text-4xl font-bold text-center 2xl:text-7xl text-stone-400">
          {user?.display_name}
        </p>
        <p className="my-4 text-center 2xl:text-lg xl:text-sm text-neutral-500">
          Seguidores: {user?.followers.total}
        </p>

        <div className="flex items-center justify-center mx-auto my-4">
          <div className="flex items-center justify-center p-4 mx-auto rounded-full bg-zinc-900">
            <p className="2xl:text-lg text-slate-300">
              {user?.email || "No disponible"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
