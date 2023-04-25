import { useContext, useState } from "react"
import axios from "axios";
import { UserContext } from "../UserContext";

export function RegisterAndLoginForm() {

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [documento, setDocumento] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //TODO: Cambia el estado de login 
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('Ingresar')

  async function handleSubmit(ev) {
    ev.preventDefault();
    const URL = isLoginOrRegister === 'Ingresar' ? 'Ingresar' : 'Registrarse';
    const { data } = await axios.post(URL, { username, password, nombres, apellidos, documento });
    setLoggedInUsername(username);
    setId(data.id);
  }

  return (
    <section className="bg-blue-200 h-screen flex items-center">

      <form className="mx-auto mb-12" onSubmit={handleSubmit}>

        <section className="text-center pt-2">
          {isLoginOrRegister === 'Registrarse' && (
            <>
              <h1>Registrarse</h1>
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

              <div>
                Ya Estás Registrado ?
                <button
                  className="pl-2"
                  onClick={() => setIsLoginOrRegister('Ingresar')}
                >Ingresar Aquí
                </button>
              </div>
            </>
          )}
          {isLoginOrRegister === 'Ingresar' && (
            <>
              <h1>Inicia Sesión</h1>
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

              <div>
                No Tienes Cuenta ?
                <button
                  className="pl-2"
                  onClick={() => setIsLoginOrRegister('Registrarse')}
                >Registrarse
                </button>
              </div>
            </>
          )}
        </section>
      </form>
    </section >
  )
}