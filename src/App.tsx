import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const App: React.FC = () => {
  const [data, setData] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const initialState = { username: "", availability: false };
  const [account, setAccount] = useReducer<any>(
    (account, updates) => ({
      ...account,
      ...updates,
    }),
    initialState
  );
  const getData = async () => {
    await axios.get("http://localhost:5000/accounts").then((response) => {
      const newData = response.data;
      setData(newData);
    });
  };
  useEffect(() => {
    getData();
  }, [data]);

  console.log(data);

  return (
    <div className="app">
      {/* <img
        src="https://th.bing.com/th/id/OIP._-4acER8opJEGWN4VUYL9gHaBc?pid=ImgDet&rs=1"
        alt="Logo"
        className="logo"
      /> */}
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
                        onChange={(e) => {
                          axios.patch(`http://localhost:5000/accounts/${item._id}`, {
                            username: item.username,
                            isAvailable: e.target.value === "NO" ? false : true,
                          });
                        }}
                      >
                        <option value="NO">NO</option>
                        <option value="YES">YES</option>
                      </select>
                      <button
                        className="delete-button"
                        onClick={() => {
                          axios.delete(`http://localhost:5000/accounts/${item._id}`);
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
                onClick={() => {
                  axios.post(`http://localhost:5000/accounts`, {
                    username: account.username,
                    isAvailable: account.availability,
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
