import { CustomToast } from '@/components/utils/CustomToast'
import { ThemeProvider } from '@/components/utils/ThemeProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import toast, { Toaster, useToasterStore } from 'react-hot-toast'

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

   const { toasts } = useToasterStore()
   const TOAST_LIMIT = 3
   useEffect(() => {
      toasts
         .filter((t) => t.visible)
         .filter((_, i) => i >= TOAST_LIMIT)
         .forEach((t) => toast.dismiss(t.id))
   }, [toasts])

   return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
         <Toaster position="bottom-center" reverseOrder={false}>
            {(t) => {
               return <CustomToast t={t} />
            }}
         </Toaster>
         <Component {...pageProps} />
      </ThemeProvider>
   )
}
