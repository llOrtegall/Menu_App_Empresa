import { useContext, useState } from "react"
import axios from "axios";
import { UserContext } from "../UserContext";

export function RegisterAndLoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //TODO 
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register')

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const URL = isLoginOrRegister === 'register' ? 'register' : 'login';
    const { data } = await axios.post(URL, { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }

  return (
    <section className="bg-blue-200 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input className="block w-full rounded-sm p-2 mb-2 border"
          value={username} onChange={ev => setUsername(ev.target.value)}
          type="text"
          placeholder="Usuario" />
        <input className="block w-full rounded-sm p-2 mb-2 border"
          value={password} onChange={ev => setPassword(ev.target.value)}
          type="password"
          placeholder="Contraseña" />
        <button className="bg-blue-500 text-white block w-full rounded-md p-2">
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>
        <div className="text-center pt-2">

          {isLoginOrRegister === 'register' && (
            <div>
              Already a member ?
              <button
                className="pl-2"
                onClick={() => setIsLoginOrRegister('login')}
              >Login Here
              </button>
            </div>
          )}
          {isLoginOrRegister === 'login' && (
            <div>
              Dont Have an account ?
              <button
                className="pl-2"
                onClick={() => setIsLoginOrRegister('register')}
              >Register
              </button>
            </div>
          )}
        </div>
      </form>
    </section>
  )
}