import { useContext } from "react";
import { TraductionDictionaryContext } from "./TraductionDictionary";

const useTraduction = () => {
  const context = useContext(TraductionDictionaryContext);
  if (!context) {
    throw new Error(
      "useTraduction must be used within a TraductionDictionaryProvider"
    );
  }
  return context;
};

export default useTraduction;
