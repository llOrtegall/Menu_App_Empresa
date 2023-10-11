import { useState } from 'react';
import { ButtonLoading, IconUser, CloseSession } from './components/ButtonLoading.jsx'

export function App() {

  const [data, setData] = useState(null);
  const [activo, setActivo] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    cantidadPalabras: "2",
    tienePrioridad_4: true
  });

  const activarComponente = () => {
    setActivo(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = 'https://ambientetest.datalaft.com:2095/api/ConsultaPrincipal';
    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYi5jb2xvcmFkbyAgICAgICAgICAiLCJuYmYiOjE2ODM1NTQxOTgsImV4cCI6MTcxNTExMTc5OCwiaWF0IjoxNjgzNTU0MTk4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM5OC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM5OC8ifQ.pprQIYakLDQTH92668mhM4CQMBcEC6zLgNXeq00m-SU'

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(formData),
    }

    try {
      setCargando(true)
      const respuesta = await fetch(apiUrl, requestOptions);
      if (respuesta.ok) {
        // La solicitud se completó con éxito
        const datos = await respuesta.json(); // Parsea la respuesta como JSON
        setData(datos)
      } else {
        // La solicitud falló, maneja el error
        console.error('Error en la solicitud:', respuesta.status, respuesta.statusText);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  }

  const RenderResultadosCedula = (data) => {

    let newArray = [];
    if (data.listas.length > 0) {
      newArray = data.listas.filter(i => i.documentoIdentidad === data.numDocumento)
    }
    return (
      newArray.length > 0
        ? <p>{newArray.length}
          <button className='bg-green-400 text-xs text-black p-1 rounded-lg font-semibold ml-4' onClick={activarComponente}>
            Analizar Consultas
          </button>
        </p>
        : <p>No tiene Antecedentes</p>
    )
  }

  function RenderizarConsultas() {

    return (
      <div>REnder </div>
    )
  }

  return (
    <>
      {/* // TODO: Modulo De Usuario Logueado  */}
      <section className='flex h-full pl-6 justify-between bg-gray-400 m-2 p-4 rounded-xl'>
        <div className='flex items-center'>
          <IconUser />
          <article className='pl-4'>
            <h2 className='text-2xl font-semibold'>Bienvenido Usuario De Prueba</h2>
            <h3 className='text-xl'>CP11185647472</h3>
          </article>
        </div>
        <CloseSession />
      </section>

      {/* // TODO: Modulo De consultas  */}
      <main className='flex justify-around grid-flow-col'>
        <section className='w-1/3 bg-green-700 p-16 m-2 rounded-xl shadow-lg'>
          <h1 className='text-2xl font-bold text-center text-white'>Consultar Antecedentes </h1>
          <form onSubmit={handleSubmit} className='flex flex-col py-2 mx-4'>
            <div className='flex flex-col py-2 mb-4'>
              <label className='py-3 font-medium text-white' htmlFor="nombre">Nombres:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className='rounded-lg p-2'
                value={formData.nombre}
                onChange={handleChange}
              />
              <label className='py-2 font-medium text-white' htmlFor="text">N° Documento:</label>
              <input
                type="text"
                id="identificacion"
                name="identificacion"
                className='rounded-lg p-2'
                value={formData.identificacion}
                onChange={handleChange}
              />
            </div>
            <button className='mt-4 p-2 bg-yellow-500 rounded-lg shadow-lg font-semibold text-lg' type="submit">Consultar</button>
          </form>
        </section>

        {/* // TODO: Modulo De Renderizado  De Consulta Información General*/}
        <section className='w-2/3 bg-blue-300 p-4 rounded-xl shadow-lg  m-2 grid place-content-center'>
          <h1 className=' bg-blue-500 w-full h-16 rounded-xl p-4 text-2xl font-semibold text-center border mb-4 shadow-lg'>Módulo De Consultas Información General</h1>
          <div className='w-full pb-4'>
            {cargando ? (
              <ButtonLoading />
            ) : data ? (
              < div className='border p-4 rounded-xl bg-blue-500 shadow-lg'>

                <section className='flex'>
                  <p className='pr-6 font-bold text-black'>Consultas Recibidas:
                    <span className='font-bold pl-4 text-white'>{data.cantCoincidencias}</span>
                  </p>
                  <p className='font-bold pr-6 text-black'>N° De Consulta:
                    <span className='font-bold pl-4 text-white'>{data.numConsulta}</span>
                  </p>
                  <p className='font-bold pr-6 text-black'>N° De Dcoumento Consultado:
                    <span className='font-bold pl-4 text-white'>{data.numDocumento}</span>
                  </p>
                </section>

                <section className='flex pt-2'>
                  <p className='font-bold pr-6 text-black'>Nombre Consultado:
                    <span className='font-bold pl-4 text-white'> {data.nombre}</span>
                  </p>
                  <p className='flex font-bold pr-6 text-black'>Resultados Con Cedula N°:
                    <span className='pr-2  font-bold pl-4 text-white'>{data.numDocumento}</span>
                    =
                    <span className='pl-4 font-bold text-white'>{RenderResultadosCedula(data)}</span></p>
                </section>
              </div>
            ) : null}
          </div>

        </section>
      </main >

      {activo && <RenderizarConsultas />}

    </>
  );
}
export default App