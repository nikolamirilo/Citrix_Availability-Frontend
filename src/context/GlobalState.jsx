import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalState = createContext();

export const useGlobalState = () => {
  return useContext(GlobalState);
};

export const GlobalStateProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState([]);
  const getData = async () => {
    await axios
      .get("https://citrix-availability.up.railway.app/users")
      .then((response) => {
        const newData = response.data;
        setUsers(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, [users]);

  return (
    <GlobalState.Provider value={{ currentUser, setCurrentUser, users }}>
      {children}
    </GlobalState.Provider>
  );
};
