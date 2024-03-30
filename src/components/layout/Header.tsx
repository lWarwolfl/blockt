import { Button } from '@/components/ui/button'
import CopyToClipboard from '@/components/utils/CopyToClipboard'
import { ThemeToggle } from '@/components/utils/ThemeToggle'
import donutBalances from '@/lib/methods/donutBalances'
import { useStore } from '@/lib/store'
import checkNetwork from '@/lib/web3/checkNetwork'
import { connectWallet, disconnectWallet } from '@/lib/web3/wallet'
import { Icon } from '@iconify-icon/react'
import { useEffect, useState } from 'react'

export default function Header() {
   const { walletAddress, metamask, update, chainId } = useStore()
   const [userBalance, setUserBalance] = useState<number | undefined>(undefined)
   const [balanceLoading, setBalanceLoading] = useState<boolean>(false)
   const [connectLoading, setConnectLoading] = useState<boolean>(false)
   const [disconnectLoading, setDisconnectLoading] = useState<boolean>(false)

   useEffect(() => {
      async function fetchInitialData() {
         const network = await checkNetwork({})

         if (useStore.getState().metamask && useStore.getState().walletAddress !== '' && network) {
            const donutCount = await donutBalances(
               { address: useStore.getState().walletAddress },
               { loading: setBalanceLoading }
            )
            setUserBalance(Number(donutCount))
         } else if (!network) {
            useStore.getState().setChainId('')
            await disconnectWallet({})
         }
      }

      fetchInitialData()
   }, [metamask, walletAddress, update, chainId])

   return (
      <div className="z-10 mb-6 flex w-full max-w-5xl items-center justify-between">
         <div className="inline-flex w-full gap-3 sm:inline-flex sm:w-fit">
            <ThemeToggle />

            {walletAddress !== '' ? (
               <>
                  <Button
                     onClick={() => disconnectWallet({ loading: setDisconnectLoading })}
                     variant="outline"
                     size="icon"
                  >
                     {disconnectLoading ? (
                        <Icon icon="line-md:loading-twotone-loop" className="absolute text-lg" />
                     ) : (
                        <Icon icon="line-md:logout" className="absolute text-lg" />
                     )}
                  </Button>

                  <CopyToClipboard
                     className=" ml-auto sm:ml-0"
                     variant="outline"
                     value={walletAddress}
                     chars={20}
                  >
                     {balanceLoading ? (
                        <span className="-ml-2 mr-2 flex items-center gap-1">
                           <Icon
                              icon="line-md:loading-twotone-loop"
                              className="align-middle text-xl"
                           />
                        </span>
                     ) : userBalance && userBalance >= 0 ? (
                        <span className="-ml-2 mr-2 flex items-center gap-1">
                           <Icon icon="solar:donut-line-duotone" className="align-middle text-xl" />
                           {userBalance} <span className="ml-1">|</span>
                        </span>
                     ) : null}
                  </CopyToClipboard>
               </>
            ) : (
               <Button
                  className="ml-auto gap-1.5 sm:ml-0"
                  onClick={() => connectWallet({ loading: setConnectLoading })}
                  disabled={!metamask}
               >
                  Connect Wallet
                  {connectLoading ? (
                     <Icon icon="line-md:loading-twotone-loop" className="-mr-2 text-xl" />
                  ) : (
                     <Icon icon="ic:outline-bolt" className="-mr-2 text-xl" />
                  )}
               </Button>
            )}
         </div>

         <div className="pointer-events-none hidden place-items-center gap-2 font-mono font-black sm:flex">
            BlockT <Icon icon="cryptocurrency:matic" className="text-3xl" />
         </div>
      </div>
   )
}
