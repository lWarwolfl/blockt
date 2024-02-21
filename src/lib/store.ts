import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
   address: string
   setAddress: (address: string) => void
}

export const useStore = create(
   persist<StoreState>(
      (set) => ({
         address: '',
         setAddress: (address) => set({ address: address }),
      }),
      {
         name: 'blockt',
      }
   )
)
