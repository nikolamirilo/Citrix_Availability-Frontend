import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalState = createContext();

export const useGlobalState = () => {
  return useContext(GlobalState);
};

export const GlobalStateProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const getAllUsers = async () => {
    await axios
      .get("https://citrix-availability.up.railway.app/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getData = async () => {
    await axios
      .get(import.meta.env.VITE_API_URL)
      .then((response) => {
        const newData = response.data;
        setData(newData);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Set currentUser as one save in localStorage
  useEffect(() => {
    const currUser = localStorage.getItem("currentUser");
    if (currUser !== "" || !currUser !== undefined || currUser !== null) {
      setCurrentUser(currUser);
    } else {
      setCurrentUser("");
    }
  }, []);
  useEffect(() => {
    getAllUsers();
  }, [users]);

  return (
    <GlobalState.Provider value={{ currentUser, setCurrentUser, users, data, getData, loaded }}>
      {children}
    </GlobalState.Provider>
  );
};
