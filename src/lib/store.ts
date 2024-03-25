import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
   walletAddress: string
   metamask: boolean
   setWalletAddress: (walletAddress: string) => void
   setMetamask: (metamask: boolean) => void
}

export const useStore = create(
   persist<StoreState>(
      (set) => ({
         walletAddress: '',
         metamask: false,
         setWalletAddress: (walletAddress) => set({ walletAddress: walletAddress }),
         setMetamask: (metamask) => set({ metamask: metamask }),
      }),
      {
         name: 'blockt',
      }
   )
)
