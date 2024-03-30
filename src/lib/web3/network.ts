import { getErrorMessage } from '@/lib/error'
import { type AsyncFunctionInterface, type NetworkInterface } from '@/lib/interfaces'
import { networks } from '@/lib/web3/networks'
import { getMetamask } from '@/lib/web3/provider'
import toast from 'react-hot-toast'
import Web3 from 'web3'

const ethereum = getMetamask()

async function checkNetwork({ loading }: AsyncFunctionInterface) {
   try {
      loading?.(true)
      const web3 = new Web3(ethereum)
      const currentChainId = Number(await web3.eth.getChainId())
      const expectedChainId = parseInt(networks[0].chainId, 16)
      return currentChainId === expectedChainId
   } catch (error) {
      loading?.(false)
      toast.error(getErrorMessage(error))
      return false
   }
}

async function switchNetwork(
   {
      network = networks[0],
   }: {
      network?: NetworkInterface
   },
   { loading }: AsyncFunctionInterface
) {
   try {
      loading?.(true)
      if (ethereum) {
         const response = await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [network],
         })

         loading?.(false)
         return response
      }
   } catch (error) {
      loading?.(false)
      toast.error(getErrorMessage(error))
      return false
   }
}

export { checkNetwork, switchNetwork }
