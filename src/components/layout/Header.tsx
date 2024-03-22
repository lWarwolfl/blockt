import { Button } from '@/components/ui/button'
import CopyToClipboard from '@/components/utils/CopyToClipboard'
import { ThemeToggle } from '@/components/utils/ThemeToggle'
import { useStore } from '@/lib/store'
import { connectWallet, disconnectWallet } from '@/lib/web3/wallet'
import { Icon } from '@iconify-icon/react'

export default function Header() {
   const { walletAddress, metamask } = useStore()

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
                  />
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
