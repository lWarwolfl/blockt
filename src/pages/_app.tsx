import { ThemeProvider } from '@/components/utils/ThemeProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
   useEffect(() => {
      if (typeof window !== 'undefined') {
         setTimeout(() => {
            const loader = document.getElementById('globalLoader')
            if (loader) loader.className = 'loaded'
            document.body.style.overflowY = 'auto'
         }, 100)

         setTimeout(() => {
            const loader = document.getElementById('globalLoader')
            if (loader) loader.style.opacity = '0'
         }, 1300)

         setTimeout(() => {
            const loader = document.getElementById('globalLoader')
            if (loader) loader.style.display = 'none'
         }, 1600)
      }
   }, [])

   return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
         <Component {...pageProps} />
      </ThemeProvider>
   )
}
