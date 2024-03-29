import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import CustomHead from '@/components/utils/CustomHead'
import { WebGLParticles } from '@/components/utils/Particles'
import { WalletDownload } from '@/components/utils/WalletDownload'
import { getErrorMessage } from '@/lib/error'
import { useStore } from '@/lib/store'
import { networks } from '@/lib/web3/networks'
import { getMetamask } from '@/lib/web3/provider'
import { disconnectWallet } from '@/lib/web3/wallet'
import clsx from 'clsx'
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
   return <WebGLParticles color="rgb(235,233,232)" />
}

const ParticleLight = () => {
   return <WebGLParticles color="rgb(182,177,174)" count={80} size={200} />
}

export default function MainLayout({ children }: Props) {
   const theme = useTheme().theme
   const themeSystem = useTheme().systemTheme

   const { walletAddress, setWalletAddress, metamask, setMetamask, chainId, setChainId } =
      useStore()
   const ethereum = getMetamask()

   useEffect(() => {
      if (ethereum) {
         setMetamask(true)

         const web3 = new Web3(ethereum)

         const handleAccountChange = async () => {
            try {
               const accounts = await web3.eth.getAccounts()
               const currentChainId = Number(await web3.eth.getChainId())
               const expectedChainId = parseInt(networks[0].chainId, 16)

               if (accounts[0]) {
                  if (currentChainId === expectedChainId) {
                     setWalletAddress(accounts[0])
                     setChainId(ethereum.chainId)
                  }
               } else if (useStore.getState().walletAddress !== '') {
                  setWalletAddress('')
                  toast.success('You successfully disconnected from MetaMask')
               }
            } catch (error) {
               toast.error(getErrorMessage(error))
            }
         }

         handleAccountChange()

         const handleNetworkChange = async () => {
            const currentChainId = Number(await web3.eth.getChainId())
            const expectedChainId = parseInt(networks[0].chainId, 16)

            if (currentChainId !== expectedChainId) {
               setChainId('')
               await disconnectWallet({})
            }
         }

         handleNetworkChange()

         ethereum.on('accountsChanged', handleAccountChange)
         ethereum.on('chainChanged', handleNetworkChange)

         return () => {
            ethereum.removeListener('accountsChanged', handleAccountChange)
            ethereum.removeListener('chainChanged', handleNetworkChange)
         }
      } else {
         setMetamask(false)
         setWalletAddress('')
         toast.error('MetaMask is not installed.')
      }
   }, [walletAddress, setWalletAddress, ethereum, setMetamask, setChainId, chainId])

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

         <main className={clsx('flex h-dvh flex-col items-center p-6 lg:p-24', font.className)}>
            <Header />
            {metamask ? children : <WalletDownload />}
            <Footer />
         </main>
      </>
   )
}
