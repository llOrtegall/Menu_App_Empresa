import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

  const [usuario, setUsuario] = useState(null)
  const [id, setId] = useState(null);
  const [names, setNames] = useState(null);
  const [lastNames, setLastNames] = useState(null);

  useEffect(() => {
    axios.get('/profile').then(response => {
      const { userId, username, nombres, apellidos } = response.data
      setId(userId);
      setUsuario(username);
      setNames(nombres)
      setLastNames(apellidos)
    })
  }, [])


  return (
    <UserContext.Provider
      value={{ id, setId, usuario, setUsuario, names, setNames, lastNames, setLastNames }}>
      {children}
    </UserContext.Provider>
  )
}