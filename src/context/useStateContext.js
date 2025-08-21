import { useContext } from "react";
import { StateContext } from "./StateContext";

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStateContext must be used within a ContextProvider");
  }
  return context;
};
