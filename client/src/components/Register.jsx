import { useState } from "react"
import axios from "axios";

export function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function RegisterAndLogin(ev) {
    ev.preventDefault();
    await axios.post('/register', { username, password });

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