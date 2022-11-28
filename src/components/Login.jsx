import React from "react";
import users from "../users.list";

const Login = () => {
  const [email, setEmail] = useState("");
  const handleLogin = () => {
    users.map((item) => {
      if (email !== item) {
        alert("Wrong email");
      } else {
      }
    });
  };

  return (
    <div className="login">
      Login with your email:
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
