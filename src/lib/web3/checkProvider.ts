import type { MetaMaskInpageProvider } from '@metamask/providers'
import toast from 'react-hot-toast'

export const checkProvider = () => {
   const ethereum = global?.window?.ethereum

   const checkMetamask = () => {
      if (
         !ethereum ||
         !ethereum.isMetaMask ||
         (ethereum?.providers && !ethereum?.providers[0]?._metamask && !ethereum._metamask)
      ) {
         toast.error('MetaMask is not installed.')
         return undefined
      }
      return ethereum as unknown as MetaMaskInpageProvider
   }

   return { checkMetamask }
}
