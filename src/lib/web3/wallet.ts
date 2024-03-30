import { getErrorMessage } from '@/lib/error'
import { type AsyncFunctionInterface } from '@/lib/interfaces'
import { getMetamask } from '@/lib/web3/provider'
import switchNetwork from '@/lib/web3/switchNetwork'
import toast from 'react-hot-toast'
import Web3 from 'web3'

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
      return false
   }
}

const walletBalance = async (
   { address }: { address: string },
   { loading }: AsyncFunctionInterface
) => {
   try {
      loading?.(true)
      const web3 = new Web3(ethereum)
      const balance = await web3.eth.getBalance(address)
      loading?.(false)
      return web3.utils.fromWei(balance, 'ether')
   } catch (error) {
      loading?.(false)
      toast.error(getErrorMessage(error))
      return false
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
      return false
   }
}

export { connectWallet, disconnectWallet, walletBalance }
