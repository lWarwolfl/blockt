import { VendingmachineAddress, vendingMachineABI } from '@/lib/contract/data'
import { getMetamask, web3provider } from '@/lib/web3/provider'
import Web3 from 'web3'

export default function getContract(MetaMask: boolean = true) {
   const web3 = new Web3(MetaMask ? getMetamask() : web3provider)
   const contract = new web3.eth.Contract(vendingMachineABI, VendingmachineAddress)
   return contract
}
