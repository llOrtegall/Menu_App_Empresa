import { useState, useEffect } from 'react';


export function App() {
  const URL = 'https://ambientetest.datalaft.com:2095/api/ConsultaPrincipal'
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const SchemaConsulta =
  {
    "nombre": "Ivan Marino Ortega Garzon",
    "identificacion": "1118307852",
    "cantidadPalabras": "2",
    "tienePrioridad_4": true
  }

  const hacerSolicitud = async () => {
    try {
      setLoading(true); // Activa el indicador de carga
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYi5jb2xvcmFkbyAgICAgICAgICAiLCJuYmYiOjE2ODM1NTQxOTgsImV4cCI6MTcxNTExMTc5OCwiaWF0IjoxNjgzNTU0MTk4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM5OC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM5OC8ifQ.pprQIYakLDQTH92668mhM4CQMBcEC6zLgNXeq00m-SU",
        },
        body: JSON.stringify(SchemaConsulta)
      });
      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hacerSolicitud();
  }, []);

  return (
    <section className='p-2 m-2 bg-blue-500 text-white rounded-lg'>
      {loading ? (
        <p>Cargando...</p>
      ) : resultado ? (
        <div>
          {console.log(resultado.nombre)}
          <h3 className='pr-2'>Persona Consultada: {resultado.nombre}</h3>
          <div>Resultado de la solicitud:</div>
        </div>
      ) : (
        <p>No se ha recibido ningún resultado.</p>
      )}
    </section>
  );
}
