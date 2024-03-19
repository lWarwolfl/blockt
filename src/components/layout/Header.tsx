import { Button } from '@/components/ui/button'
import CopyToClipboard from '@/components/utils/CopyToClipboard'
import { ThemeToggle } from '@/components/utils/ThemeToggle'
import { useStore } from '@/lib/store'
import { useWallet } from '@/lib/web3/useWallet'
import { Icon } from '@iconify-icon/react'

export default function Header() {
   const { walletAddress, metamask } = useStore()
   const { connectWallet } = useWallet()

   return (
      <div className="z-10 mb-6 flex w-full max-w-5xl items-center justify-between">
         <div className="inline-flex w-full justify-between gap-3 sm:inline-flex sm:w-fit sm:justify-start">
            <ThemeToggle />

            {walletAddress !== '' ? (
               <CopyToClipboard variant="outline" value={walletAddress} chars={20} />
            ) : (
               <Button className="gap-1.5" onClick={connectWallet} disabled={!metamask}>
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
