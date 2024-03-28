import { type NetworkInterface } from '@/lib/interfaces'

export const networks: NetworkInterface[] = [
   {
      chainId: '0x13881',
      blockExplorerUrls: ['https://mumbai.polygonscan.com'],
      nativeCurrency: {
         decimals: 18,
         name: 'MATIC',
         symbol: 'MATIC',
      },
      rpcUrls: ['https://polygon-mumbai-bor-rpc.publicnode.com'],
      chainName: 'Mumbai',
   },
]
