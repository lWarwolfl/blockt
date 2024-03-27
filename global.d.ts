import { type EthereumProvider } from '@/lib/interfaces'

declare global {
   interface Window {
      ethereum?: EthereumProvider
   }
}
