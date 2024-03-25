import { contract } from '@/lib/contract/contract'
import { getErrorMessage } from '@/lib/error'
import toast from 'react-hot-toast'

export default async function getVendingMachineBalance() {
   try {
      const balance = await contract.methods.getVendingMachineBalance().call()
      return balance
   } catch (error) {
      toast.error(getErrorMessage(error))
   }
}
