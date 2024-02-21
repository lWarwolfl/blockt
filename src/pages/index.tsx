import { ContractForm } from '@/components/utils/ContractForm'
import { ThemeToggle } from '@/components/utils/ThemeToggle'
import { Icon } from '@iconify-icon/react'
import { Poppins } from 'next/font/google'
import Head from 'next/head'

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
            <meta
               name="description"
               content="My goal is to work with web3 to connect to smart contracts and send transactions on ethereum blockchain in this project"
            />
            <meta name="keywords" content="Sina, Kheiri, BlockT, Web3, Blockchain, Ethereum" />
            <meta name="author" content="Sina Kheiri" />
            <meta
               name="viewport"
               content="width=device-width, height=device-height, initial-scale=1.0"
            />
         </Head>
         <main className={`flex flex-col items-center p-6 lg:p-24 ${font.className} h-dvh`}>
            <div className="z-10 mb-6 flex w-full max-w-5xl items-center justify-between">
               <ThemeToggle />
               <div className="pointer-events-none flex place-items-center gap-2 font-mono font-black lg:pointer-events-auto">
                  BlockT <Icon icon="cryptocurrency:etc" className="text-3xl" />
               </div>
            </div>

            <ContractForm />

            <div className="flex w-full max-w-5xl items-center justify-center gap-2 text-center font-mono text-sm">
               Developed by
               <a href="https://github.com/lWarwolfl" target="_blank" className="flex items-center">
                  <Icon icon="bxl:github" className="text-lg" />
                  lWarwolfl
               </a>
            </div>
         </main>
      </>
   )
}
