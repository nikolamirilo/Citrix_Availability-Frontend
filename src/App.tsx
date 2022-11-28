import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { AiOutlineDelete, AiFillMinusCircle, AiFillCheckCircle } from "react-icons/ai";
import { useGlobalState } from "./context/GlobalState.jsx";
import Login from "./components/Login.jsx";

interface Types {
  account: Object;
  username: String;
  availability: Boolean;
  item: Object;
  updates: any;
}

const App: React.FC = () => {
  const [data, setData] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const { currentUser } = useGlobalState();
  const initialState = { username: "", availability: false };
  const [account, setAccount] = useReducer(
    (account, updates) => ({
      ...account,
      ...updates,
    }),
    initialState
  );
  const getData = async () => {
    await axios
      .get(import.meta.env.VITE_API_URL)
      .then((response) => {
        const newData = response.data;
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <div className="app">
      {currentUser === "" ? (
        <Login />
      ) : (
        <div className="content">
          <h2>Hi {currentUser}</h2>
          <h1>Citrix availability</h1>
          <table className="availability-table">
            <thead>
              <tr className="table-heading">
                <td>Username</td>
                <td>Is Available</td>
              </tr>
            </thead>
            <tbody>
              {data !== null &&
                data.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <div className="left-cell-content">
                          {item.isAvailable ? (
                            <AiFillCheckCircle
                              size={30}
                              style={{ color: "#fff", fill: "green", background: "#fff", borderRadius: "100%" }}
                            />
                          ) : (
                            <AiFillMinusCircle
                              size={30}
                              style={{ color: "#fff", fill: "red", background: "#fff", borderRadius: "100%" }}
                            />
                          )}
                          <p> {item.username}</p>
                        </div>
                      </td>
                      <td className="select">
                        <select
                          value={item.isAvailable ? "YES" : "NO"}
                          onChange={async (e) => {
                            await axios
                              .patch(`${import.meta.env.VITE_API_URL}/${item._id}`, {
                                username: item.username,
                                isAvailable: e.target.value === "NO" ? false : true,
                              })
                              .then(() => {
                                // window.location.reload();
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                        >
                          <option value="NO">NO</option>
                          <option value="YES">YES</option>
                        </select>
                        <button
                          className="delete-button"
                          onClick={async () => {
                            await axios
                              .delete(`${import.meta.env.VITE_API_URL}/${item._id}`)
                              .then(() => {
                                // window.location.reload();
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                        >
                          <AiOutlineDelete size={30} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <button
            className="add-button"
            onClick={() => {
              if (isClicked) {
                setIsClicked(false);
              } else {
                setIsClicked(true);
              }
            }}
          >
            {isClicked ? "Close" : "Add Account"}
          </button>
          {isClicked ? (
            <>
              <h2>Enter new Citrix user</h2>
              <div className="add-account">
                <input
                  type="text"
                  value={account.username}
                  placeholder="Enter account name"
                  onChange={(e) => {
                    setAccount({ username: e.target.value });
                  }}
                />
                <select
                  onChange={(e) => {
                    if (e.target.value === "YES") {
                      setAccount({ availability: true });
                    } else if (e.target.value === "NO") {
                      setAccount({ availability: false });
                    }
                  }}
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
                <button
                  onClick={async () => {
                    await axios
                      .post(`${import.meta.env.VITE_API_URL}`, {
                        username: account.username,
                        isAvailable: account.availability,
                      })
                      .then(() => {
                        // window.location.reload();
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                >
                  Add Account
                </button>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default App;
