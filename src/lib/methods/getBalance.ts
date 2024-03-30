import getContract from '@/lib/contract/contract'
import { getErrorMessage } from '@/lib/error'
import { type AsyncFunctionInterface } from '@/lib/interfaces'
import { getMetamask } from '@/lib/web3/provider'
import toast from 'react-hot-toast'
import Web3 from 'web3'

export default async function getBalance({ loading }: AsyncFunctionInterface) {
   try {
      loading?.(true)
      const web3 = new Web3(getMetamask())
      const contract = getContract(false)
      const balance = await contract.methods.getBalance().call()
      loading?.(false)
      return web3.utils.fromWei(Number(balance), 'ether')
   } catch (error) {
      loading?.(false)
      toast.error(getErrorMessage(error))
   }
}
