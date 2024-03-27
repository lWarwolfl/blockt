import { type EthereumProviderInterface } from '@/lib/interfaces'

declare global {
   interface Window {
      ethereum?: EthereumProviderInterface
   }
}
