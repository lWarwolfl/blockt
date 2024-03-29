import getContract from '@/lib/contract/contract'
import { getErrorMessage } from '@/lib/error'
import {
   type AsyncFunctionInterface,
   type TransactionConfirmationInterface,
} from '@/lib/interfaces'
import { getMetamask } from '@/lib/web3/provider'
import toast from 'react-hot-toast'
import Web3 from 'web3'

export const costPerDonut: number = 0.02

interface Props {
   amount: number
   address: string
}

export default async function purchase(params: Props, { loading }: AsyncFunctionInterface) {
   try {
      loading?.(true)
      const web3 = new Web3(getMetamask())
      const contract = getContract()

      const gasPrice = await web3.eth.getGasPrice()
      // const gasEstimate = await contract?.methods
      //    .purchase(params.amount)
      //    .estimateGas({ from: params.address })

      await contract?.methods
         .purchase(params.amount)
         .send({
            from: params.address,
            gas: `${200_000}`,
            gasPrice: `${Number(gasPrice)}`,
            value: (
               Number(web3.utils.toWei(`${costPerDonut}`, 'ether')) * params.amount
            ).toString(),
         })
         .on('transactionHash', (hash: string) => {
            loading?.(false)
            toast.success(`Your transaction was sent with this hash: ${hash}`)
         })
         .on('confirmation', (confirmation: unknown) => {
            const data = confirmation as TransactionConfirmationInterface
            if (Number(data.confirmations) === 1) {
               toast.success('Your transaction was successful.')
            }
         })
      return true
   } catch (error) {
      loading?.(false)
      toast.error(getErrorMessage(error))
      return false
   }
}
