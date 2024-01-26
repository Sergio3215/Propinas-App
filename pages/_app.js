import Head from 'next/head'
import '../public/global.css';
import '../public/logo.png';
import '../public/No Image.png';
import '../public/No Image Full.png';
import '../public/icon_store.svg';
import '../public/logo.svg';
import '../public/icon_person.svg';
import { NextUIProvider } from '@nextui-org/react'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="theme-color" />
        <meta name="description" content="Propinas App brinda el servicio para puntuar a colaboradores, rankear entre los mejores locales, y tener feedback directo de los clientes" />
        <title>Propina App</title>
        <link rel="apple-touch-icon" href="/logo.png" alt="Propinas App" />
        <link rel="icon" type="image/x-icon" href="/logo.ico" alt="Propinas App" />
        {/* <script src="https://flow.microsoft.com/Content/msflowsdk-1.1.js"></script> */}
      </Head>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
      <Analytics />
    </>
  )
}

export default MyApp;