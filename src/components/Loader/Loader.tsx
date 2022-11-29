import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useGlobalState } from "../../context/GlobalState";
import "./Loader.css";

const Loader: React.FC = () => {
  const { width } = useGlobalState();
  return (
    <div className="loader">
      <PulseLoader size={width > 600 ? 30 : 20} color="white" />
    </div>
  );
};

export default Loader;
