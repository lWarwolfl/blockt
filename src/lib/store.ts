import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
   contractAddress: string
   walletAddress: string
   metamask: boolean
   setContractAddress: (contractAddress: string) => void
   setWalletAddress: (walletAddress: string) => void
   setMetamask: (metamask: boolean) => void
}

export const useStore = create(
   persist<StoreState>(
      (set) => ({
         contractAddress: '',
         walletAddress: '',
         metamask: false,
         setContractAddress: (contractAddress) => set({ contractAddress: contractAddress }),
         setWalletAddress: (walletAddress) => set({ walletAddress: walletAddress }),
         setMetamask: (metamask) => set({ metamask: metamask }),
      }),
      {
         name: 'blockt',
      }
   )
)
