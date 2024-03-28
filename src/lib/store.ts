import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
   walletAddress: string
   metamask: boolean
   update: number
   rerender: number
   chainId: string
   setWalletAddress: (walletAddress: string) => void
   setMetamask: (metamask: boolean) => void
   updateNow: () => void
   rerenderNow: () => void
   setChainId: (chainId: string) => void
}

export const useStore = create(
   persist<StoreState>(
      (set, get) => ({
         walletAddress: '',
         metamask: false,
         update: 0,
         rerender: 0,
         chainId: '',
         setWalletAddress: (walletAddress) => set({ walletAddress: walletAddress }),
         setMetamask: (metamask) => set({ metamask: metamask }),
         updateNow: () => set({ update: get().update + 1 }),
         rerenderNow: () => set({ rerender: get().rerender + 1 }),
         setChainId: (chainId) => set({ chainId: chainId }),
      }),
      {
         name: 'blockt',
      }
   )
)
