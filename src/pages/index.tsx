import { Button } from '@/components/ui/button'
import { ContractForm } from '@/components/utils/ContractForm'
import CopyToClipboard from '@/components/utils/CopyToClipboard'
import { ThemeToggle } from '@/components/utils/ThemeToggle'
import { getErrorMessage } from '@/lib/error'
import { useStore } from '@/lib/store'
import { checkIfMetamask } from '@/lib/web3/checkIfMetamask'
import { useWallet } from '@/lib/web3/useWallet'
import { Icon } from '@iconify-icon/react'
import { Poppins } from 'next/font/google'
import Head from 'next/head'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import Web3 from 'web3'

const font = Poppins({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
   variable: '--font-family',
})

export default function Home() {
   const { walletAddress, setWalletAddress } = useStore()
   const { connectWallet } = useWallet()

   useEffect(() => {
      const ethereum = checkIfMetamask()
      const web3 = new Web3(ethereum)

      const checkWallet = async () => {
         try {
            const accounts = await web3.eth.getAccounts()
            if (walletAddress && walletAddress !== '' && walletAddress !== accounts[0])
               setWalletAddress('')
         } catch (error) {
            toast.error(getErrorMessage(error))
         }
      }

      checkWallet()

      ethereum.on('accountsChanged', async function () {
         const accounts = await web3.eth.getAccounts()
         if (walletAddress && walletAddress !== '' && walletAddress !== accounts[0]) {
            setWalletAddress('')
            toast.success('You disconnected from MetaMask')
         }
      })

      return () => {
         ethereum.removeAllListeners('accountsChanged')
      }
   }, [walletAddress, setWalletAddress])

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
               <div className="inline-flex w-full justify-between gap-3 sm:inline-flex sm:w-fit sm:justify-start">
                  <ThemeToggle />

                  {walletAddress !== '' ? (
                     <CopyToClipboard variant="outline" value={walletAddress} chars={20} />
                  ) : (
                     <Button onClick={connectWallet}>
                        Connect Wallet
                        <Icon icon="ic:outline-bolt" className="-mr-2 ml-1 text-xl" />
                     </Button>
                  )}
               </div>

               <div className="pointer-events-none hidden place-items-center gap-2 font-mono font-black sm:flex">
                  BlockT <Icon icon="cryptocurrency:etc" className="text-3xl" />
               </div>
            </div>

            <ContractForm />

            <div className="flex items-center gap-2">
               <div className="pointer-events-none flex place-items-center gap-2 font-mono text-sm font-black sm:hidden">
                  <Icon icon="cryptocurrency:etc" className="text-2xl" /> BlockT
               </div>

               <div className="flex w-full max-w-5xl items-center justify-center gap-2 text-center font-mono text-sm">
                  Developed by
                  <a
                     href="https://github.com/lWarwolfl"
                     target="_blank"
                     className="flex items-center"
                  >
                     <Icon icon="bxl:github" className="text-lg" />
                     lWarwolfl
                  </a>
               </div>
            </div>
         </main>
      </>
   )
}
