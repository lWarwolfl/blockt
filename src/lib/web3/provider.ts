import { type MetaMaskProvider } from '@/lib/interfaces'
import Web3 from 'web3'

const web3provider = new Web3.providers.HttpProvider(
   'https://sepolia.infura.io/v3/212d1693254640c2a54709133b3dc68a'
)

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

export { getMetamask, web3provider }
