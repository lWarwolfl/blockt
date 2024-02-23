import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
   contractAddress: string
   walletAddress: string
   setAddress: (contractAddress: string) => void
}

export const useStore = create(
   persist<StoreState>(
      (set) => ({
         contractAddress: '',
         walletAddress: '',
         setAddress: (contractAddress) => set({ contractAddress: contractAddress }),
      }),
      {
         name: 'blockt',
      }
   )
)
