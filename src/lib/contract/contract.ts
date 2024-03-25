import { VendingmachineAddress, vendingMachineABI } from '@/lib/contract/data'
import { web3provider } from '@/lib/web3/provider'
import Web3 from 'web3'

const web3 = new Web3(web3provider)

export const contract = new web3.eth.Contract(vendingMachineABI, VendingmachineAddress, {
   gasPrice: '20000000000',
   gas: '1000000',
})
