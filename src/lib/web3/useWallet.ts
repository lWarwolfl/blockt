import { getErrorMessage } from '@/lib/error'
import { useStore } from '@/lib/store'
import { checkProvider } from '@/lib/web3/checkProvider'
import toast from 'react-hot-toast'
import Web3 from 'web3'

export const useWallet = () => {
   const { setWalletAddress } = useStore()
   const { checkMetamask } = checkProvider()

   const connectWallet = async () => {
      try {
         const ethereum = checkMetamask()
         if (ethereum) {
            const web3 = ethereum && new Web3(ethereum)
            const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as string[]
            if (accounts[0]) {
               toast.success(`You successfully connected to MetaMask.`)
               const web3Accounts = await web3.eth.getAccounts()
               setWalletAddress(web3Accounts[0])
            } else {
               toast.error(`You don't have any available accounts.`)
            }
         }
      } catch (error) {
         toast.error(getErrorMessage(error))
      }
   }

   const disconnectWallet = async () => {
      try {
         const ethereum = checkMetamask()
         if (ethereum) {
            await ethereum.request({
               method: 'wallet_revokePermissions',
               params: [
                  {
                     eth_accounts: {},
                  },
               ],
            })
         }
      } catch (error) {
         toast.error(getErrorMessage(error))
      }
   }

   return { connectWallet, disconnectWallet }
}
