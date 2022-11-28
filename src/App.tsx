import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

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
  const initialState = { username: "", availability: false };
  const [account, setAccount] = useReducer(
    (account, updates) => ({
      ...account,
      ...updates,
    }),
    initialState
  );
  const getData = async () => {
    await axios.get(import.meta.env.VITE_API_URL).then((response) => {
      const newData = response.data;
      setData(newData);
    });
  };
  useEffect(() => {
    getData();
    console.log(data);
  }, [data]);

  return (
    <div className="app">
      <div className="content">
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
                    <td>{item.username}</td>
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
    </div>
  );
};

export default App;
