import { loader } from '@/lib/loader'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
   return (
      <Html lang="en">
         <Head>
            <style>{loader}</style>
         </Head>
         <body>
            <div id={'globalLoader'}>
               <div className="loader"></div>
            </div>
            <Main />
            <NextScript />
         </body>
      </Html>
   )
}
