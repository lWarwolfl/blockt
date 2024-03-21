import { type MetaMaskEthereumProvider } from '@/lib/interfaces'

declare global {
   interface Window {
      ethereum?: MetaMaskEthereumProvider
   }
}
