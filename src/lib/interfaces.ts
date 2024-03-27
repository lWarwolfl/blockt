export interface MetaMaskProvider {
   isMetaMask: boolean
   _metamask: {
      isUnlocked: () => Promise<boolean>
   }
   request: (request: { method: string; params?: Array<unknown> }) => Promise<unknown>
   on: (event: string, listener: (...args: unknown[]) => void) => void
   removeListener: (event: string, listener: (...args: unknown[]) => void) => void
   chainId: string
   selectedAddress: string | null
   isConnected: () => boolean
}

export interface EthereumProvider extends MetaMaskProvider {
   isTronLink: boolean
   providers?: MetaMaskProvider[]
}

export interface AsyncFunctionProps {
   loading?: React.Dispatch<React.SetStateAction<boolean>>
}
