import { type MetaMaskProviderInterface } from '@/lib/interfaces'
import Web3 from 'web3'

const web3provider = new Web3.providers.HttpProvider(
   'https://polygon-mumbai.infura.io/v3/212d1693254640c2a54709133b3dc68a'
)

const getMetamask = (): MetaMaskProviderInterface | undefined => {
   const ethereum = global?.window?.ethereum

   if (!ethereum || !ethereum.isMetaMask) {
      return undefined
   }

   if (ethereum.providers && Array.isArray(ethereum.providers)) {
      const metamaskProvider = ethereum.providers.find((provider) => provider._metamask)
      if (metamaskProvider) {
         return metamaskProvider as MetaMaskProviderInterface
      }
   }

   if (ethereum._metamask) {
      return ethereum as MetaMaskProviderInterface
   }

   return undefined
}

export { getMetamask, web3provider }
