export function ConsultaDetallada({ prop }) {

  const { listas, numDocumento } = prop;

  let arrayIgual = []

  if (listas.length > 0) {
    arrayIgual = listas.filter(i => i.documentoIdentidad === numDocumento)
    return (
      <section className='bg-yellow-200 p-4 m-4 rounded-lg shadow-xl'>
        <h1 className=' bg-yellow-400 w-full h-16 rounded-xl p-4 text-2xl font-semibold text-center border shadow-lg'>
          Módulo De Consulta Información Detallada
        </h1>
        {arrayIgual.length > 0
          ? (arrayIgual.map(i => (
            <section key={i.idLista} className='m-3 p-3 bg-green-200 flex flex-col shadow-lg rounded-2xl'>
              <div className='p-2'>
                Documento: <span className='pr-4 font-semibold'>{i.documentoIdentidad}</span>
                Tipo Documento: <span className='pr-4 font-semibold'>{i.tipoDocumento}</span>
                Nombres: <span className='pr-4 font-semibold'>{i.nombreCompleto}</span>
                Tipo De Persona: <span className='pr-4 font-semibold'>{i.tipoPersona}</span>
              </div>
              <div className='p-2'>
                Fuente De Consulta: <span className='pr-4 font-semibold'>{i.fuenteConsulta}</span>
                Nivel De Pioridad: <span className='pr-4 font-semibold'>{i.prioridad}</span>
                Presunto Delito: <span className='pr-4 font-semibold'>{i.delito}</span>
              </div>
              <div className='p-2'>
                Fecha De Actualización: <span className='pr-4 font-semibold'>{i.fechaActualizacion}</span>
                Alias: <span className='pr-4 font-semibold'>{i.alias}</span>
                Peps: <span className='pr-4 font-semibold'>{i.peps}</span>
                zona: <span className='pr-4 font-semibold'>{i.zona}</span>
              </div>
              <div className='p-2'>
                Otra Informacion: <span className='pr-4 font-semibold'>{i.justificacionCambio}</span>
                Nombre Tipo De Lista: <span className='pr-4 font-semibold'>{i.nombreTipoLista}</span>
              </div>
            </section>
          )))
          : (<div>No Results</div>)
        }
      </section >
    )
  } else {
    <div>No Resultados</div>
  }
}

