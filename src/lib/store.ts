import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
   walletAddress: string
   metamask: boolean
   donuts: number
   setWalletAddress: (walletAddress: string) => void
   setMetamask: (metamask: boolean) => void
   increaseDonuts: () => void
}

export const useStore = create(
   persist<StoreState>(
      (set, get) => ({
         walletAddress: '',
         metamask: false,
         donuts: 0,
         setWalletAddress: (walletAddress) => set({ walletAddress: walletAddress }),
         setMetamask: (metamask) => set({ metamask: metamask }),
         increaseDonuts: () => set({ donuts: get().donuts + 1 }),
      }),
      {
         name: 'blockt',
      }
   )
)
