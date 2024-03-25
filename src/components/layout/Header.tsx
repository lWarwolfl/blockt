import { Button } from '@/components/ui/button'
import CopyToClipboard from '@/components/utils/CopyToClipboard'
import { ThemeToggle } from '@/components/utils/ThemeToggle'
import donutBalances from '@/lib/methods/donutBalances'
import { useStore } from '@/lib/store'
import { connectWallet, disconnectWallet } from '@/lib/web3/wallet'
import { Icon } from '@iconify-icon/react'
import { useEffect, useState } from 'react'

export default function Header() {
   const { walletAddress, metamask } = useStore()
   const [userBalance, setUserBalance] = useState<number | undefined>(undefined)

   useEffect(() => {
      async function fetchInitialData() {
         if (metamask && walletAddress && walletAddress !== '') {
            const donutCount = await donutBalances(walletAddress)
            setUserBalance(Number(donutCount))
         }
      }

      fetchInitialData()
   }, [metamask, walletAddress])

   return (
      <div className="z-10 mb-6 flex w-full max-w-5xl items-center justify-between">
         <div className="inline-flex w-full gap-3 sm:inline-flex sm:w-fit">
            <ThemeToggle />

            {walletAddress !== '' ? (
               <>
                  <Button onClick={disconnectWallet} variant="outline" size="icon">
                     <Icon icon="line-md:logout" className="absolute text-xl" />
                  </Button>

                  <CopyToClipboard
                     className=" ml-auto sm:ml-0"
                     variant="outline"
                     value={walletAddress}
                     chars={20}
                  >
                     {userBalance !== undefined && (
                        <span className="-ml-2 mr-2 flex items-center gap-1">
                           <Icon icon="solar:donut-line-duotone" className="align-middle text-xl" />
                           {userBalance} <span className="ml-1">|</span>
                        </span>
                     )}
                  </CopyToClipboard>
               </>
            ) : (
               <Button
                  className="ml-auto gap-1.5 sm:ml-0"
                  onClick={connectWallet}
                  disabled={!metamask}
               >
                  Connect Wallet
                  <Icon icon="ic:outline-bolt" className="-mr-2 text-xl" />
               </Button>
            )}
         </div>

         <div className="pointer-events-none hidden place-items-center gap-2 font-mono font-black sm:flex">
            BlockT <Icon icon="cryptocurrency:etc" className="text-3xl" />
         </div>
      </div>
   )
}
