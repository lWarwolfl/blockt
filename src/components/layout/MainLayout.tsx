import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { ChangeNetwork } from '@/components/utils/ChangeNetwork'
import CustomHead from '@/components/utils/CustomHead'
import { WebGLParticles } from '@/components/utils/Particles'
import { WalletDownload } from '@/components/utils/WalletDownload'
import { getErrorMessage } from '@/lib/error'
import { useStore } from '@/lib/store'
import useMobileDetect from '@/lib/useMobileDetect'
import { cn } from '@/lib/utils'
import { checkNetwork } from '@/lib/web3/network'
import { getMetamask } from '@/lib/web3/provider'
import { useTheme } from 'next-themes'
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

const ParticleDark = () => {
   const isMobile = useMobileDetect()
   return <WebGLParticles color="rgb(235,233,232)" size={isMobile ? 260 : 200} />
}

const ParticleLight = () => {
   const isMobile = useMobileDetect()
   return <WebGLParticles color="rgb(182,177,174)" size={isMobile ? 280 : 220} />
}

export default function MainLayout({ children }: Props) {
   const theme = useTheme().theme
   const themeSystem = useTheme().systemTheme

   const { walletAddress, metamask, network } = useStore()

   useEffect(() => {
      const ethereum = getMetamask()

      if (ethereum) {
         useStore.getState().setMetamask(true)

         const web3 = new Web3(ethereum)

         const handleAccountChange = async () => {
            try {
               const accounts = await web3.eth.getAccounts()
               const network = await checkNetwork({})
               useStore.getState().setNetwork(network)

               if (accounts[0]) {
                  if (network) {
                     useStore.getState().setWalletAddress(accounts[0])
                  }
               } else if (useStore.getState().walletAddress !== '') {
                  useStore.getState().setWalletAddress('')
                  toast.success('You successfully disconnected from MetaMask')
               }
            } catch (error) {
               toast.error(getErrorMessage(error))
            }
         }

         handleAccountChange()

         const handleNetworkChange = async () => {
            const network = await checkNetwork({})
            useStore.getState().setNetwork(network)
         }

         handleNetworkChange()

         ethereum.on('accountsChanged', handleAccountChange)
         ethereum.on('chainChanged', handleNetworkChange)

         return () => {
            ethereum.removeListener('accountsChanged', handleAccountChange)
            ethereum.removeListener('chainChanged', handleNetworkChange)
         }
      } else {
         useStore.getState().setMetamask(false)
         useStore.getState().setWalletAddress('')
         useStore.getState().setNetwork(false)
         toast.error('MetaMask is not installed.')
      }
   }, [walletAddress])

   return (
      <>
         <CustomHead />
         {theme !== 'system' ? (
            theme === 'dark' ? (
               <ParticleDark />
            ) : (
               <ParticleLight />
            )
         ) : themeSystem === 'dark' ? (
            <ParticleDark />
         ) : (
            <ParticleLight />
         )}

         <main
            className={cn(
               'flex h-dvh min-h-fit flex-col items-center gap-6 p-6 lg:p-24',
               font.className
            )}
         >
            <Header />
            {metamask ? network ? children : <ChangeNetwork /> : <WalletDownload />}
            <Footer />
         </main>
      </>
   )
}
