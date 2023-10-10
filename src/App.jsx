import { useState } from 'react';

export function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    cantidadPalabras: "2",
    tienePrioridad_4: true
  });

  console.log(formData);


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


    // Configura los datos de la solicitud POST
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(formData),
    };

    // Realiza la solicitud POST usando fetch
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data);
        // Puedes manejar la respuesta del servidor aquí
      })
      .catch((error) => {
        console.error('Error al hacer la solicitud POST:', error);
        // Puedes manejar los errores aquí
      });
  };

  return (
    <div>
      <h1>Formulario de Ejemplo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="text">Email:</label>
          <input
            type="text"
            id="identificacion"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleChange}
          />
        </div>
        {/* Otros campos del formulario */}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
