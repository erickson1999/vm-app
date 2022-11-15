import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ContextUIProvider } from '../context/ContextUI/ContextUIProvider'
import { ContextAuthProvider } from '../context/ContextAuth'


export default function App({ Component, pageProps }: AppProps) {
  return <ContextAuthProvider>
    <ContextUIProvider>
      <Component {...pageProps} />
    </ContextUIProvider>
  </ContextAuthProvider>

}
