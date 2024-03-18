import type { MetaMaskInpageProvider } from '@metamask/providers'

export const checkProvider = () => {
   const ethereum = global?.window?.ethereum

   const checkMetamask = () => {
      if (!ethereum || !ethereum.isMetaMask) return undefined
      return ethereum as unknown as MetaMaskInpageProvider
   }

   return { checkMetamask }
}
