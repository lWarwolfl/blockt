import getContract from '@/lib/contract/contract'
import { getErrorMessage } from '@/lib/error'
import { type AsyncFunctionProps } from '@/lib/interfaces'
import toast from 'react-hot-toast'

interface Props {
   address: string
}

export default async function donutBalances(params: Props, { loading }: AsyncFunctionProps) {
   try {
      loading?.(true)
      const contract = getContract()
      const balance = await contract.methods.donutBalances(params.address).call()
      loading?.(false)
      return balance
   } catch (error) {
      loading?.(false)
      toast.error(getErrorMessage(error))
   }
}
