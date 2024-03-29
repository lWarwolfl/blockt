import { type AsyncFunctionInterface, type NetworkInterface } from '@/lib/interfaces'
import { useStore } from '@/lib/store'
import { networks } from '@/lib/web3/networks'
import { getMetamask } from '@/lib/web3/provider'
import { disconnectWallet } from '@/lib/web3/wallet'
import toast from 'react-hot-toast'
import { type ProviderRpcError } from 'web3'

const ethereum = getMetamask()
interface Props {
   network?: NetworkInterface
}

export default async function switchNetwork(params: Props, { loading }: AsyncFunctionInterface) {
   const { network = networks[0] } = params

   try {
      loading?.(true)
      if (ethereum) {
         const response = await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: network.chainId }],
         })

         useStore.getState().setChainId(network.chainId)
         loading?.(false)
         return response
      }
   } catch (error: unknown) {
      const e = error as ProviderRpcError

      if (e.code === 4902 && ethereum) {
         try {
            const response = await ethereum.request({
               method: 'wallet_addEthereumChain',
               params: [network],
            })

            useStore.getState().setChainId(network.chainId)
            loading?.(false)
            return response
         } catch (error: unknown) {
            const e = error as ProviderRpcError
            toast.error(e.message)
            loading?.(false)
            await disconnectWallet({})
         }
      } else {
         toast.error(e.message)
         loading?.(false)
         await disconnectWallet({})
      }
   }
}
