import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { GlobalStateProvider } from "./context/GlobalState.jsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>
);
