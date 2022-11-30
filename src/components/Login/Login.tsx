import { useEffect, useState } from "react";
import { useGlobalState } from "../../context/GlobalState";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const { users, setCurrentUser, currentUser, setAuthorized } = useGlobalState();
  const handleLogin = () => {
    let nthUser = 0;
    let isAuthorized = false;
    for (let i = 0; i < users.length; i++) {
      if (email === users[i].email) {
        isAuthorized = true;
        nthUser = i;
      }
    }
    if (isAuthorized) {
      setCurrentUser(users[nthUser].email);
      localStorage.setItem("currentUser", users[nthUser].email);
      setAuthorized(true);
    } else {
      alert("Unauthorized user");
    }
  };

  useEffect(() => {
    const currUser = localStorage.getItem("currentUser");
    if (currUser !== "null" && currUser !== null) {
      localStorage.setItem("currentUser", currUser);
      setAuthorized(true);
    }
  }, [currentUser]);

  return (
    <div className="login">
      <h2> Login with your email</h2>
      <input
        type="email"
        placeholder="Enter your business email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button className="submit" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
