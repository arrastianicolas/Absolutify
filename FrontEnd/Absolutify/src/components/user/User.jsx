import { useState } from "react";
import { useProfile } from "../../contexts/UserContext";
import { useTraduction } from "../../custom/TraductionDictionary";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const User = () => {
  const { user } = useProfile();
  const { t } = useTraduction();
  const [eye, setEye] = useState(false);

  const handleShowEmail = () => {
    setEye((prev) => !prev);
  };

  return (
    <div className="flex justify-center w-full mx-auto 2xl:h-full xl:h-80 ">
      <div className="grid justify-center w-full mx-auto rounded-xl">
        <h2 className="my-6 text-2xl text-center text-white 2xl:text-4xl font-questrial">
          {t("perfil")}
        </h2>
        <div className="2xl:w-[200px] 2xl:h-[200px]   w-[140px] h-[140px]  md:rounded-xl mx-auto md:my-4">
          <img
            src={user?.images?.[0]?.url || "/png/logoAbso.webp"}
            alt="Imagen de perfil"
            className="object-fill w-full h-full rounded-full"
          />
        </div>
        <p className="text-4xl font-bold text-center 2xl:text-7xl text-stone-400">
          {user?.display_name}
        </p>
        <p className="my-4 text-center 2xl:text-lg xl:text-sm font-questrial text-neutral-500">
          {t("seguidores")}: {user?.followers.total}
        </p>

        <div className="flex items-center justify-center mx-auto my-4 ">
          <div className="flex items-center justify-center p-4 mx-auto rounded-full bg-zinc-900">
            <p className="flex items-center max-w-full 2xl:text-lg text-slate-300 font-questrial">
              {eye ? user?.email : "*".repeat(user?.email.length || 10)}
              <button onClick={handleShowEmail} className="p-1">
                {eye ? (
                  <IoMdEye />
                ) : (
                  <IoMdEyeOff className="relative bottom-1" />
                )}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
