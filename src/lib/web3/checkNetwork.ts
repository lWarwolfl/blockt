import { getErrorMessage } from '@/lib/error'
import { type AsyncFunctionInterface } from '@/lib/interfaces'
import { networks } from '@/lib/web3/networks'
import { getMetamask } from '@/lib/web3/provider'
import toast from 'react-hot-toast'
import Web3 from 'web3'

export default async function checkNetwork({ loading }: AsyncFunctionInterface) {
   try {
      loading?.(true)
      const web3 = new Web3(getMetamask())
      const currentChainId = Number(await web3.eth.getChainId())
      const expectedChainId = parseInt(networks[0].chainId, 16)
      return currentChainId === expectedChainId
   } catch (error) {
      loading?.(false)
      toast.error(getErrorMessage(error))
      return false
   }
}
