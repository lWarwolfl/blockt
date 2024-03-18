import toast from 'react-hot-toast'
import Web3 from 'web3'
import { getErrorMessage } from '../error'
import { useStore } from '../store'
import { checkProvider } from './checkProvider'

export const useWallet = () => {
   const { setWalletAddress } = useStore()
   const { checkMetamask } = checkProvider()

   const connectWallet = async () => {
      try {
         const ethereum = checkMetamask()
         if (ethereum) {
            const web3 = ethereum && new Web3(ethereum)
            const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as string[]
            if (accounts[0]) toast.success(`You successfully connected to MetaMask.`)

            const web3Accounts = await web3.eth.getAccounts()
            setWalletAddress(web3Accounts[0])
         }
      } catch (error) {
         toast.error(getErrorMessage(error))
      }
   }

   return { connectWallet }
}
