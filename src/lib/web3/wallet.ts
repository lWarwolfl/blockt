import { getErrorMessage } from '@/lib/error'
import { type AsyncFunctionInterface } from '@/lib/interfaces'
import { getMetamask } from '@/lib/web3/provider'
import switchNetwork from '@/lib/web3/switchNetwork'
import toast from 'react-hot-toast'

const ethereum = getMetamask()

const connectWallet = async ({ loading }: AsyncFunctionInterface) => {
   try {
      if (ethereum) {
         loading?.(true)
         const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as string[]
         if (accounts[0]) {
            toast.success('You successfully connected to MetaMask')
            await switchNetwork({}, { loading })
            loading?.(false)
         }
      }
   } catch (error) {
      loading?.(false)
      toast.error(getErrorMessage(error))
   }
}

//experimental feature and currently only works with the extension
const disconnectWallet = async ({ loading }: AsyncFunctionInterface) => {
   try {
      if (ethereum) {
         loading?.(true)
         await ethereum.request({
            method: 'wallet_revokePermissions',
            params: [
               {
                  eth_accounts: {},
               },
            ],
         })
         loading?.(false)
      }
   } catch (error) {
      loading?.(false)
      toast.error(getErrorMessage(error))
   }
}

export { connectWallet, disconnectWallet }
