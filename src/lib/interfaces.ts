export interface MetaMaskProviderInterface {
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

export interface EthereumProviderInterface extends MetaMaskProviderInterface {
   isTronLink: boolean
   providers?: MetaMaskProviderInterface[]
}

export interface AsyncFunctionInterface {
   loading?: React.Dispatch<React.SetStateAction<boolean>>
}

export interface NetworkInterface {
   chainId: string
   chainName: string
   nativeCurrency: NativeCurrencyInterface
   rpcUrls: string[]
   blockExplorerUrls: string[]
}

export interface NativeCurrencyInterface {
   name: string
   symbol: string
   decimals: number
}
