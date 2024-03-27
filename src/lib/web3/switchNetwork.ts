import { type NetworkInterface } from '@/lib/interfaces'
import { networks } from '@/lib/web3/networks'
import { getMetamask } from '@/lib/web3/provider'
import toast from 'react-hot-toast'
import { type ProviderRpcError } from 'web3'

const ethereum = getMetamask()

export default async function switchNetwork(network: NetworkInterface = networks[0]) {
   if (network) {
      try {
         if (ethereum) {
            await ethereum.request({
               method: 'wallet_switchEthereumChain',
               params: [{ chainId: network.chainId }],
            })
         }
         return network.chainId
      } catch (error: unknown) {
         const e = error as ProviderRpcError

         if (e.code === 4902 && ethereum) {
            try {
               await ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [network],
               })
            } catch (error: unknown) {
               const e = error as ProviderRpcError
               toast.error(e.message)
            }
         } else {
            toast.error(e.message)
         }
      }
   }
}
