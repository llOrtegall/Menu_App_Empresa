import { useContext } from "react";
import { RegisterAndLoginForm } from "./components/RegisterAndLoginForm";
import { UserContext } from "./UserContext";
import { Consulta } from "./components/Consulta.jsx";


export function Routes() {
  const { usuario, id, names, lastNames } = useContext(UserContext);

  if (usuario) {
    return (
      <Consulta info={{ usuario, id, names, lastNames }} />
    )
  }

  return (
    <RegisterAndLoginForm />
  )
}