import { useContext, useState } from "react"
import axios from "axios";
import { UserContext } from "../UserContext";

export function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function RegisterAndLogin(ev) {
    ev.preventDefault();
    const { data } = await axios.post('/register', { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }

  return (
    <section className="bg-blue-200 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={RegisterAndLogin}>
        <input className="block w-full rounded-sm p-2 mb-2 border"
          value={username} onChange={ev => setUsername(ev.target.value)}
          type="text"
          placeholder="Usuario" />
        <input className="block w-full rounded-sm p-2 mb-2 border"
          value={password} onChange={ev => setPassword(ev.target.value)}
          type="password"
          placeholder="Contraseña" />
        <button className="bg-blue-500 text-white block w-full rounded-md p-2">Register</button>
      </form>
    </section>
  )
}