import getContract from '@/lib/contract/contract'
import { getErrorMessage } from '@/lib/error'
import { type AsyncFunctionProps } from '@/lib/interfaces'
import { getMetamask } from '@/lib/web3/provider'
import toast from 'react-hot-toast'
import Web3 from 'web3'

export const costPerDonut: number = 0.0005

interface Props {
   amount: number
   address: string
}

export default async function purchase(params: Props, { loading }: AsyncFunctionProps) {
   try {
      loading?.(true)
      const web3 = new Web3(getMetamask())
      const contract = getContract()
      await contract.methods
         .purchase(params.amount)
         .send({
            from: params.address,
            value: (
               Number(web3.utils.toWei(`${costPerDonut}`, 'ether')) * params.amount
            ).toString(),
         })
         .on('transactionHash', (hash: string) => {
            loading?.(false)
            toast.success(`Your transaction was successfully sent with this hash: ${hash}`)
         })
      return true
   } catch (error) {
      loading?.(false)
      toast.error(getErrorMessage(error))
      return false
   }
}
