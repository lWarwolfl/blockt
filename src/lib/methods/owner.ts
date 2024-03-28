import getContract from '@/lib/contract/contract'
import { getErrorMessage } from '@/lib/error'
import { type AsyncFunctionInterface } from '@/lib/interfaces'
import toast from 'react-hot-toast'

export default async function owner({ loading }: AsyncFunctionInterface) {
   try {
      loading?.(true)
      const contract = getContract(false)
      const owner = await contract.methods.owner().call()
      loading?.(false)
      return owner
   } catch (error) {
      loading?.(false)
      toast.error(getErrorMessage(error))
   }
}
