import { getErrorMessage } from '@/lib/error'
import { type AsyncFunctionInterface, type NetworkInterface } from '@/lib/interfaces'
import { useStore } from '@/lib/store'
import { networks } from '@/lib/web3/networks'
import { getMetamask } from '@/lib/web3/provider'
import toast from 'react-hot-toast'

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
            method: 'wallet_addEthereumChain',
            params: [network],
         })

         useStore.getState().setChainId(network.chainId)
         loading?.(false)
         return response
      }
   } catch (error) {
      loading?.(false)
      toast.error(getErrorMessage(error))
   }
}
