import { getErrorMessage } from '@/lib/error'
import { getMetamask } from '@/lib/web3/provider'
import toast from 'react-hot-toast'

const ethereum = getMetamask()

const connectWallet = async () => {
   try {
      if (ethereum) {
         const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as string[]
         if (accounts[0]) {
            toast.success(`You successfully connected to MetaMask.`)
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

export { connectWallet, disconnectWallet }
