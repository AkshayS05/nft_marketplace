// to use a script tag
import Script from 'next/script';
// to switch between light and dark mode
import { ThemeProvider } from 'next-themes'

import { Navbar,Footer } from '../components'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return(
    // here attribute= class means we want to change mode on the basis of classes
    <ThemeProvider attribute="class">
<div className='dark:bg-nft-dark bg-white min-h-screen' >
  <Navbar />
  <div className='pt-65'>

    <Component {...pageProps} />
  </div>
  <Footer />
    </div>
    <Script src="https://kit.fontawesome.com/e644cb8867.js" crossorigin="anonymous"></Script>
    </ThemeProvider>
    )
}
