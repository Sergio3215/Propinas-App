import Head from 'next/head'
import '../public/global.css';
import { NextUIProvider } from '@nextui-org/react'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="theme-color" />
        <meta name="description" content="Propinas App brinda el servicio para puntuar a colaboradores, rankear entre los mejores locales, y tener feedback directo de los clientes" />
        <title>Propina App</title>
      </Head>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
    </>
  )
}

export default MyApp;