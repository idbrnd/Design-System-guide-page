import type { AppProps } from 'next/app'
import '@idbrnd/design-system/style.css'
import '@idbrnd/design-system/tokens.css'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
