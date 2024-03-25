import { VendingmachineAddress, vendingMachineABI } from '@/lib/contract/data'
import Web3 from 'web3'

const provider = new Web3.providers.HttpProvider(
   'https://sepolia.infura.io/v3/212d1693254640c2a54709133b3dc68a'
)

const web3 = new Web3(provider)

export const contract = new web3.eth.Contract(vendingMachineABI, VendingmachineAddress)
