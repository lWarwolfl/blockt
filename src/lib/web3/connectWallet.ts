import toast from 'react-hot-toast'
import Web3 from 'web3'
import { getErrorMessage } from '../error'
import { checkIfMetamask } from './checkIfMetamask'

export const connectWallet = async () => {
   try {
      const ethereum = checkIfMetamask()
      const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as string[]
      if (accounts[0])
         toast.success(
            `You successfully connected to MetaMask with this wallet contractAddress: ${accounts[0]}`
         )
      const web3 = new Web3(ethereum)
   } catch (error) {
      toast.error(getErrorMessage(error))
   }
}
