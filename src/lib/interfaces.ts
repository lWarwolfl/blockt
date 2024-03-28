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

export interface TransactionConfirmationInterface {
   confirmations: bigint
   receipt: TransactionReceiptInterface
   latestBlockHash: string
}

export interface TransactionReceiptInterface {
   blockHash: string
   blockNumber: bigint
   cumulativeGasUsed: bigint
   effectiveGasPrice: bigint
   from: string
   gasUsed: bigint
   logs: TransactionLogInterface[]
   logsBloom: string
   status: bigint
   to: string
   transactionHash: string
   transactionIndex: bigint
   type: bigint
}

export interface TransactionLogInterface {
   address: string
   topics: string[]
   data: string
   blockNumber: bigint
   transactionHash: string
   transactionIndex: bigint
   blockHash: string
   logIndex: bigint
   removed: boolean
}
