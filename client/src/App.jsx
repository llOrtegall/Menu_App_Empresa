import { UserContextProvider } from "./UserContext";
// import { Consulta } from "./components/Consulta";
// import { Register } from "./components/Register";
import axios from "axios";
import { Routes } from "./Routes";

export function App() {
  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  )
}