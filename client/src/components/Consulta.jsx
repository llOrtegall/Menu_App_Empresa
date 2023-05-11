import { useState } from 'react';
import { ConsultaDetallada } from './ConsultaDetallada.jsx';
import { ButtonLoading, IconUser, CloseSession } from './ButtonLoading.jsx';

export function Consulta({ info }) {

  console.log(info);

  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    cantidadPalabras: '',
    tienePrioridad_4: true
  });

  const toggleComponente = () => {
    setMostrarComponente(!mostrarComponente);
  };

  const ValidarDocumentoConsulta = ({ prop }) => {

    let newArray = [];

    if (prop.length > 0) {
      newArray = prop.filter(i => i.documentoIdentidad === data.numDocumento)
      return (
        <div>
          <span className='bg-yellow-300 text-red-700 p-2 px-4 rounded-md'>{newArray.length}</span>
          <button className='p-2 rounded-lg ml-4 text-green-600 border bg-white hover:cursor-pointer hover:bg-green-400 hover:text-white'
            onClick={toggleComponente}>Ver Detalles</button>
        </ div>
      )
    } else {
      return (<p>No Encontrado</p>)
    }
  }

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
        const datos = await respuesta.json();
        setData(datos)
      } else {
        console.error('Error en la solicitud:', respuesta.status, respuesta.statusText);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  }


  return (
    <>
      {/* // TODO: Modulo De Usuario Logueado  */}
      <section className='flex h-full pl-6 justify-between bg-gray-400 m-4 p-4 rounded-xl shadow-lg'>
        <div className='flex items-center'>
          <IconUser />
          <article className='pl-4'>
            <h2 className='text-2xl font-semibold'>Bienvenido: <span className='text-purple-700'>{info.names}</span> <span className='text-purple-700'>{info.lastNames}</span></h2>
            <h3 className='text-xl'>{info.usuario} <span className='text-sm pl-4'>{info.id}</span></h3>
          </article>
        </div>
        <CloseSession />
      </section>

      {/* // TODO: Modulo De consultar Antecedentes  */}
      <main className='flex justify-between'>
        <section className='w-1/3 bg-green-500 p-12 m-4 rounded-xl shadow-xl'>
          <h1 className='text-2xl font-bold text-center text-white'>Módulo Consultar Antecedentes</h1>
          <form onSubmit={handleSubmit} className='flex flex-col py-4'>

            <div className='flex flex-row p-2 items-center justify-between'>
              <label className='font-medium text-white mr-2' htmlFor="nombre">Nombres:</label>
              <input
                type="text" id="nombre"
                name="nombre" className='rounded-lg p-2 w-full'
                value={formData.nombre} onChange={handleChange}
              />
            </div>

            <div className='flex flex-row p-2 items-center justify-between'>
              <label className='font-normal text-white' htmlFor="identificacion">N° Documento</label>
              <input
                type="text" id="identificacion"
                name="identificacion" className='rounded-lg p-2'
                value={formData.identificacion} onChange={handleChange}
              />
              <label className='font-normal text-white' htmlFor="cantidadPalabras">N° Palabras</label>
              <select className='p-2 rounded-lg ' defaultValue='1'
                name="cantidadPalabras" id="cantidadPalabras" onChange={handleChange} >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
              </select>
            </div>

            <button className='w-full p-2 mt-4 bg-yellow-500 rounded-lg text-white shadow-lg font-semibold text-lg hover:bg-white hover:text-yellow-500'
              type="submit">
              Consultar
            </button>

          </form>
        </section>

        {/* // TODO: Modulo De Renderizado  De Consulta Información General*/}
        <section className='w-2/3 bg-blue-300 p-4 rounded-xl shadow-lg  m-4'>
          <h1 className=' bg-blue-500 w-full h-16 rounded-xl p-4 text-2xl font-semibold text-center border mb-4 shadow-lg'>Módulo De Consultas Información General</h1>
          <div className='w-full pb-4'>
            {cargando ? (
              <ButtonLoading />
            ) : data ? (
              < div className='border p-4 rounded-xl bg-blue-500 shadow-lg '>

                <section className='flex justify-center items-center'>
                  <div className='pr-6 font-bold text-black'>Consultas Recibidas:
                    <span className='font-bold pl-4 text-white'>{data.cantCoincidencias}</span>
                  </div>
                  <div className='font-bold pr-6 text-black'>N° De Consulta:
                    <span className='font-bold pl-4 text-white'>{data.numConsulta}</span>
                  </div>
                  <div className='font-bold pr-6 text-black'>N° De Dcoumento Consultado:
                    <span className='font-bold pl-4 text-white'>{data.numDocumento}</span>
                  </div>
                </section>

                <section className='flex pt-2 justify-center items-center'>
                  <div className='font-bold pr-6 text-black'>Nombre Consultado:
                    <span className='font-bold pl-4 text-white'> {data.nombre}</span>
                  </div>
                  <div className='flex font-bold pr-6 text-black items-center'>Resultados Que Contienen :
                    <span className='pr-2  font-bold pl-4 text-white'>{data.numDocumento}</span>
                    =
                    <span className='pl-4 font-bold text-white '>
                      {
                        data.listas.length > 0
                          ? <ValidarDocumentoConsulta prop={data.listas} />
                          : (<p className='text-red-700'>Ninguno !</p>)
                      }
                    </span>
                  </div>

                </section>
              </div>
            ) : null}
          </div>
        </section>
      </main >

      {/* // TODO: Modulo De Rendirezado Especifico  */}
      {data
        ? mostrarComponente && <ConsultaDetallada prop={data} />
        : null
      }
    </>
  );
}