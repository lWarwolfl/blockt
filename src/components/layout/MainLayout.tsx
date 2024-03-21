import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import CustomHead from '@/components/utils/CustomHead'
import { WalletDownload } from '@/components/utils/WalletDownload'
import { getErrorMessage } from '@/lib/error'
import { useStore } from '@/lib/store'
import { checkProvider } from '@/lib/web3/checkProvider'
import { Poppins } from 'next/font/google'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import Web3 from 'web3'

const font = Poppins({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
   variable: '--font-family',
})

interface Props {
   children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
   const { walletAddress, setWalletAddress, metamask, setMetamask } = useStore()
   const { checkMetamask } = checkProvider()
   const ethereum = checkMetamask()

   useEffect(() => {
      if (ethereum) {
         setMetamask(true)
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
            try {
               const accounts = await web3.eth.getAccounts()

               if (walletAddress && walletAddress !== '' && walletAddress !== accounts[0]) {
                  setWalletAddress('')
                  toast.success('You successfully disconnected from MetaMask')
               }
            } catch (error) {
               toast.error(getErrorMessage(error))
            }
         })

         return () => {
            ethereum.removeAllListeners('accountsChanged')
         }
      } else {
         setMetamask(false)
         setWalletAddress('')
      }
   }, [walletAddress, setWalletAddress, ethereum, setMetamask])

   return (
      <>
         <CustomHead />
         <main className={`flex flex-col items-center p-6 lg:p-24 ${font.className} h-dvh`}>
            <Header />
            {metamask ? children : <WalletDownload />}
            <Footer />
         </main>
      </>
   )
}
