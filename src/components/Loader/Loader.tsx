import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useGlobalState } from "../../context/GlobalState";
import "./Loader.css";

const Loader: React.FC = () => {
  const { width } = useGlobalState();
  return (
    <div className="loader">
      <PacmanLoader size={width > 600 ? 50 : 40} />
    </div>
  );
};

export default Loader;
