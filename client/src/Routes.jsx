import { useContext } from "react";
import { RegisterAndLoginForm } from "./components/RegisterAndLoginForm";
import { UserContext } from "./UserContext";

export function Routes() {
  const { username, id } = useContext(UserContext);

  if (username) {
    return 'logged in' + username + id
  }

  return (
    <RegisterAndLoginForm />
  )
}