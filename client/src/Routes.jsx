import { useContext } from "react";
import { RegisterAndLoginForm } from "./components/RegisterAndLoginForm";
import { UserContext } from "./UserContext";
import { Consulta } from "./components/Consulta";

export function Routes() {
  const { username, id } = useContext(UserContext);

  if (username) {
    return (
      <Consulta />
    )
  }

  return (
    <RegisterAndLoginForm />
  )
}