import React from "react";
import Loader from "./components/Loader/Loader.jsx";
import { useGlobalState } from "./context/GlobalState.jsx";
const Content = React.lazy(() => import("./components/Content/Content.jsx"));
const Login = React.lazy(() => import("./components/Login/Login.jsx"));

const App: React.FC = () => {
  const { currentUser, setCurrentUser, authorized } = useGlobalState();
  const usr = localStorage.getItem("currentUser");
  return (
    <div className="app">
      {!authorized ? (
        <React.Suspense fallback={<Loader />}>
          <Login />
        </React.Suspense>
      ) : (
        <React.Suspense fallback={<Loader />}>
          <Content />
        </React.Suspense>
      )}
    </div>
  );
};

export default App;
