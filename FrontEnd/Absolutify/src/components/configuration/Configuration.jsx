import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { useTraduction } from "../../custom/TraductionDictionary";

const Configuration = () => {
  const { setLanguage } = useTraduction();
  const [show, setShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  const { t } = useTraduction();

  const handleClickChange = () => {
    setShow(!show);
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setSelectedLanguage(lang);
    setShow(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto rounded-xl ">
      <div className="flex justify-center w-full mx-auto my-16">
        <h2 className="text-2xl text-white 2xl:text-4xl xl:text-2xl font-questrial">
          {t("configuracion")}
        </h2>
      </div>
      <div className="flex justify-center mx-auto md:max-w-[500px] max-w-[300px] ">
        <div className="grid items-center justify-center my-5 grid-cols-1  mx-auto 2xl:h-[200px] xl:h-[150px] bg-stone-200 bg-opacity-15 shadow-md shadow-black rounded-xl">
          <div className="flex items-center justify-between md:w-[500px] w-[300px] p-3">
            <div className="max-w-[60px] max-h-[79px] ">
              <h3 className="font-semibold 2xl:text-xl xl:text-lg text-slate-200 font-questrial">
                {t("cuenta")}
              </h3>
            </div>
            <div>
              <button className="flex items-center gap-3 px-2 py-1 font-questrial font-bold text-black transition-all bg-white border border-black rounded-full hover:bg-neutral-500">
                {t("editar")} <MdModeEdit />
              </button>
            </div>
          </div>
          <div className="relative flex items-center justify-between p-3">
            <div className="max-w-[60px] max-h-[79px]">
              <h3 className="font-semibold 2xl:text-xl xl:text-lg text-slate-200 font-questrial">
                {t("idioma")}
              </h3>
            </div>
            <div>
              <button
                onClick={handleClickChange}
                className="flex items-center gap-3 px-2 py-1  font-questrial font-bold text-black transition-all bg-white border border-black rounded-full hover:bg-neutral-500"
              >
                {selectedLanguage === "es" ? t("español") : t("ingles")}{" "}
                {show ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </button>
              {show && (
                <div className="absolute mt-2 bg-white  border border-black rounded-xl shadow-md md:top-9 md:left-[391px] left-48">
                  <button
                    onClick={() => handleLanguageSelect("es")}
                    className="block w-full px-4 py-2 text-left font-questrial  transition-all hover:scale-105"
                  >
                    {t("español")}
                  </button>
                  <button
                    onClick={() => handleLanguageSelect("en")}
                    className="block w-full px-4 py-2 text-left font-questrial transition-all hover:scale-105"
                  >
                    {t("ingles")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
