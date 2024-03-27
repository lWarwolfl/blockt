import getContract from '@/lib/contract/contract'
import { getErrorMessage } from '@/lib/error'
import { type AsyncFunctionInterface } from '@/lib/interfaces'
import toast from 'react-hot-toast'

export default async function getVendingMachineBalance({ loading }: AsyncFunctionInterface) {
   try {
      loading?.(true)
      const contract = getContract(false)
      const balance = await contract.methods.getVendingMachineBalance().call()
      loading?.(false)
      return balance
   } catch (error) {
      loading?.(false)
      toast.error(getErrorMessage(error))
   }
}
