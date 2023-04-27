import { useContext, useState } from "react"
import axios from "axios";
import { UserContext } from "../UserContext";

export function RegisterAndLoginForm() {

  // TODO: User Context Recibe el contexto del usuario creado
  const { setId, setUsuario, setNames, setLastNames } = useContext(UserContext);

  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [documento, setDocumento] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //TODO: Cambia el estado de login 
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('Ingresar')

  async function handleSubmitRegister(ev) {
    ev.preventDefault();
    const { data } = await axios.post('/Registrarse', { nombres, apellidos, documento });
    setId(data.id); setUsuario(data.username); setNames(data.nombres); setLastNames(data.apellidos);
  }

  async function handleSubmitLogin(ev) {
    ev.preventDefault();
    const { data } = await axios.post('/Ingresar', { username, password });
    setId(data.id); setUsuario(data.username); setNames(data.nombres); setLastNames(data.apellidos)
  }

  return (
    <section className="bg-blue-200 w-screen h-screen grid place-content-center">
      {isLoginOrRegister === 'Registrarse' && (
        <form className="w-96 text-center" onSubmit={handleSubmitRegister}>
          <h1 className="pb-2 font-semibold text-xl">Registrarse</h1>
          <input className="block w-full rounded-sm p-2 mb-2 border"
            value={nombres} onChange={ev => setNombres(ev.target.value)}
            type="text"
            placeholder="Nombres" />
          <input className="block w-full rounded-sm p-2 mb-2 border"
            value={apellidos} onChange={ev => setApellidos(ev.target.value)}
            type="text"
            placeholder="Apellidos" />
          <input className="block w-full rounded-sm p-2 mb-2 border"
            value={documento} onChange={ev => setDocumento(ev.target.value)}
            type="text"
            placeholder="N° Documento" />
          <button className="bg-blue-500 text-white block w-full rounded-md p-2">
            {isLoginOrRegister === 'Registrarse' ? 'Registrarse' : 'Ingresar'}
          </button>
          <div className="mt-2">
            Ya Estás Registrado ?
            <button
              className="pl-2 font-semibold hover:text-red-600"
              onClick={() => setIsLoginOrRegister('Ingresar')}
            >Ingresar Aquí
            </button>
          </div>
        </form>
      )}
      {isLoginOrRegister === 'Ingresar' && (
        <form className="w-96 text-center" onSubmit={handleSubmitLogin}>
          <h1 className="pb-2 font-semibold text-xl">Iniciar Sesión</h1>
          <input className="block w-full rounded-sm p-2 mb-2 border"
            value={username} onChange={ev => setUsername(ev.target.value)}
            type="text"
            placeholder="Usuario" />
          <input className="block w-full rounded-sm p-2 mb-2 border"
            value={password} onChange={ev => setPassword(ev.target.value)}
            type="password"
            placeholder="Contraseña" />
          <button className="bg-blue-500 text-white block w-full rounded-md p-2">
            {isLoginOrRegister === 'Registrarse' ? 'Registrarse' : 'Ingresar'}
          </button>
          <div className="mt-2">
            No Tienes Cuenta ?
            <button
              className="pl-2 font-semibold hover:text-red-600"
              onClick={() => setIsLoginOrRegister('Registrarse')}
            >Registrarse
            </button>
          </div>
        </form>
      )}
    </section >
  )
}