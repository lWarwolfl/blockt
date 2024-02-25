import toast from 'react-hot-toast'
import Web3 from 'web3'
import { getErrorMessage } from '../error'
import { useStore } from '../store'
import { checkIfMetamask } from './checkIfMetamask'

export const useWallet = () => {
   const { setWalletAddress } = useStore()
   const ethereum = checkIfMetamask()
   const web3 = new Web3(ethereum)

   const connectWallet = async () => {
      try {
         const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as string[]
         if (accounts[0]) toast.success(`You successfully connected to MetaMask.`)

         const web3Accounts = await web3.eth.getAccounts()
         setWalletAddress(web3Accounts[0])
      } catch (error) {
         toast.error(getErrorMessage(error))
      }
   }

   return { connectWallet }
}
