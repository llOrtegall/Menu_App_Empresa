import { useState } from 'react';

export function App() {
  const [responseData, setResponseData] = useState({})
  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    cantidadPalabras: "2",
    tienePrioridad_4: true
  });

  console.log(responseData);


  // "nombre": "WILMAN IVAN ORTEGA BETANCOURT",
  // "numDocumento": "1087406670",

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
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
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setResponseData(data);
      })
      .catch((error) => {
        console.error('Error al hacer la solicitud POST:', error);
      });
  };

  return (
    <>
      <section className='flex h-full pl-6 justify-between bg-gray-400 m-2 p-4 rounded-xl'>
        <div className='flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <article className='pl-4'>
            <h2 className='text-2xl font-semibold'>Bienvenido Usuario De Prueba</h2>
            <h3 className='text-xl'>CP11185647472</h3>
          </article>
        </div>

        <button className='flex flex-col items-center  rounded-lg'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          <p className='font-semibold'>Cerrar Sesion</p>
        </button>
      </section>

      <main className='flex justify-around grid-flow-col'>
        <section className='w-1/3 bg-green-700 p-16 m-2 rounded-xl shadow-lg'>
          <h1 className='text-2xl font-bold text-center text-white'>Consultar Antecedentes </h1>
          <form onSubmit={handleSubmit} className='flex flex-col py-2'>
            <div className='flex flex-col py-8 mb-4'>
              <label className='py-3 font-medium text-white' htmlFor="nombre">Nombres:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className='rounded-lg p-2'
                value={formData.nombre}
                onChange={handleChange}
              />
              <label className='py-3 font-medium text-white' htmlFor="text">N° Documento:</label>
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

        <section className='w-2/3 bg-blue-300 p-10 m-2 rounded-xl shadow-lg'>
          <div>
            Aqui quiero colocar Algunos Datos De La Consulta
          </div>
        </section>
      </main>

      <section className='bg-green-300 m-2'>
        <div>
          Este Cuadrp Es De Ejemplo
        </div>
      </section>
    </>
  );
}

export default App;
