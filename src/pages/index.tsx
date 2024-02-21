import { ContractForm } from '@/components/utils/ContractForm'
import { ThemeToggle } from '@/components/utils/ThemeToggle'
import { Icon } from '@iconify-icon/react'
import { Poppins } from 'next/font/google'
import Head from 'next/head'
import { Roboto } from 'next/font/google'

const font = Poppins({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
   variable: '--font-family',
})

export default function Home() {
   return (
      <>
         <Head>
            <title>BlockT - Welcome To Blockchain World Brought To You By Web3</title>
            <meta name="viewport" content="width=device-width, height=device-height" />
         </Head>
         <main
            className={`flex min-h-screen flex-col items-center p-6 lg:p-24 ${font.className} h-dvh`}
         >
            <div className="z-10 mb-6 flex w-full max-w-5xl items-center justify-between">
               <ThemeToggle />
               <div className="pointer-events-none flex place-items-center gap-2 font-mono font-black lg:pointer-events-auto">
                  BlockT <Icon icon="cryptocurrency:etc" className="text-3xl" />
               </div>
            </div>

            <ContractForm />
         </main>
      </>
   )
}
