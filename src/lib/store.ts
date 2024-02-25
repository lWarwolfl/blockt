import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
   contractAddress: string
   walletAddress: string
   setContractAddress: (contractAddress: string) => void
   setWalletAddress: (walletAddress: string) => void
}

export const useStore = create(
   persist<StoreState>(
      (set) => ({
         contractAddress: '',
         walletAddress: '',
         setContractAddress: (contractAddress) => set({ contractAddress: contractAddress }),
         setWalletAddress: (walletAddress) => set({ walletAddress: walletAddress }),
      }),
      {
         name: 'blockt',
      }
   )
)
