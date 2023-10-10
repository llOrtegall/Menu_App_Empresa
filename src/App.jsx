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
    <section className='bg-blue-900 p-10 m-2 rounded-md w-96 shadow-lg'>
      <h1 className='text-2xl font-bold text-center text-white'>Consultar Antecedentes </h1>
      <form onSubmit={handleSubmit} className='flex flex-col py-2'>
        <div className='flex flex-col py-2'>
          <label className='py-3 font-normal text-white' htmlFor="nombre">Nombres:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className='rounded-lg p-2'
            value={formData.nombre}
            onChange={handleChange}
          />
          <label className='py-3 font-normal text-white' htmlFor="text">N° Documento:</label>
          <input
            type="text"
            id="identificacion"
            name="identificacion"
            className='rounded-lg p-2'
            value={formData.identificacion}
            onChange={handleChange}
          />
        </div>
        <button className='mt-4 p-2 bg-yellow-500 rounded-lg shadow-lg' type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default App;
