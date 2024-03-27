import { type NetworkInterface } from '@/lib/interfaces'

export const networks: NetworkInterface[] = [
   {
      chainId: '0xaa36a7',
      chainName: 'Sepolia test network',
      nativeCurrency: {
         name: 'SepoliaETH',
         symbol: 'SepoliaETH',
         decimals: 18,
      },
      rpcUrls: ['https://sepolia.infura.io/v3/'],
      blockExplorerUrls: ['https://sepolia.etherscan.io/'],
   },
]
