import { type NetworkInterface } from '@/lib/interfaces'

export const networks: NetworkInterface[] = [
   {
      chainId: '0x13882',
      blockExplorerUrls: ['https://amoy.polygonscan.com/'],
      nativeCurrency: {
         decimals: 18,
         name: 'MATIC',
         symbol: 'MATIC',
      },
      rpcUrls: ['https://rpc-amoy.polygon.technology/'],
      chainName: 'Polygon Amoy Testnet',
   },
]
