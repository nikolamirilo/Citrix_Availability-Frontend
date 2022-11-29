import { useState } from "react";
import { useGlobalState } from "../../context/GlobalState";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const { users, setCurrentUser } = useGlobalState();
  const handleLogin = () => {
    let isAuthorized = false;
    let nthUser = 0;
    for (let i = 0; i < users.length; i++) {
      if (email === users[i].email) {
        isAuthorized = true;
        nthUser = i;
      }
    }
    if (isAuthorized) {
      setCurrentUser(users[nthUser].email);
    } else {
      alert("Unauthorized user");
    }
  };

  return (
    <div className="login">
      <h2> Login with your email:</h2>

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
