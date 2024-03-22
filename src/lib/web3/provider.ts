import { type MetaMaskProvider } from '@/lib/interfaces'

const getMetamask = () => {
   const ethereum = global?.window?.ethereum

   if (
      !ethereum ||
      !ethereum.isMetaMask ||
      (ethereum?.providers && !ethereum?.providers[0]?._metamask && !ethereum._metamask)
   ) {
      return undefined
   } else {
      return ethereum as MetaMaskProvider
   }
}

export { getMetamask }
