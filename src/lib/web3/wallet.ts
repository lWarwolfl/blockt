import { getErrorMessage } from '@/lib/error'
import { type AsyncFunctionInterface } from '@/lib/interfaces'
import { useStore } from '@/lib/store'
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
            useStore.getState().setWalletAddress(accounts[0])
            toast.success('You successfully connected to MetaMask')
            useStore.getState().setChainId('')
            const network = await switchNetwork()
            useStore.getState().setChainId(network ? network : '')
            loading?.(false)
         }
      }
   } catch (error) {
      loading?.(false)
      toast.error(getErrorMessage(error))
   }
}

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
