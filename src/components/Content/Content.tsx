import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { AiFillCheckCircle, AiFillMinusCircle, AiOutlineDelete } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { useGlobalState } from "../../context/GlobalState.jsx";
import "./Content.css";

interface Types {
  account: Object;
  username: String;
  availability: Boolean;
  item: Object;
  updates: any;
}

const Content: React.FC = () => {
  const [data, setData] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const { currentUser, setCurrentUser } = useGlobalState();
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
    <div className="content">
      <h2
        style={{
          textTransform: "capitalize",
          position: "absolute",
          top: "2vh",
          left: "2vw",
          fontSize: "1.6rem",
        }}
      >
        Hi, {currentUser.split(".", 1)}
      </h2>

      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "3px",
          textTransform: "capitalize",
          position: "absolute",
          top: "2vh",
          right: "2vw",
          fontSize: "1.2rem",
        }}
        onClick={() => {
          setCurrentUser("");
        }}
      >
        Logout {"  "} <BiLogOutCircle size={25} />
      </button>
      <h1>Citrix availability</h1>
      <table className="availability-table">
        <thead>
          <tr className="table-heading">
            <td></td>
            <td>Username</td>
            <td>Is Available</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {data !== null &&
            data.map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    {item.isAvailable ? (
                      <AiFillCheckCircle
                        size={30}
                        style={{
                          color: "#fff",
                          fill: "green",
                          background: "#fff",
                          borderRadius: "100%",
                        }}
                      />
                    ) : (
                      <AiFillMinusCircle
                        size={30}
                        style={{
                          color: "#fff",
                          fill: "red",
                          background: "#fff",
                          borderRadius: "100%",
                        }}
                      />
                    )}
                  </td>
                  <td>
                    <div className="left-cell-content">
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
                  </td>
                  <td>
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
                    setAccount({ username: "", availability: false });
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
  );
};

export default Content;