import Image from 'next/image';

export default function Home() {
  return (
    <section className='flex min-h-full flex-col justify-center 
      py-12 sm:px-6 lg:px-8 bg-gray-200'>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt='logo' height="100" width="100"
          className='mx-auto w-auto'
          src="/images/logo.png"
        />
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>Ingresa Con Tú Cuenta</h2>
      </div>
      {/* AuthForm */}
    </section >
  )
}
