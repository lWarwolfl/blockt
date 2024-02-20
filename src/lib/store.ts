import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface StoreState {
   address: string
   setAddress: (address: string) => void
}

export const useStore = create(
   persist<StoreState>(
      (set, get) => ({
         address: '',
         setAddress: (address) => set({ address: address }),
      }),
      {
         name: 'blockt',
         storage: createJSONStorage(() => sessionStorage),
      }
   )
)
