import { ThemeProvider } from '@/components/utils/ThemeProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
   return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
         <Component {...pageProps} />
      </ThemeProvider>
   )
}
