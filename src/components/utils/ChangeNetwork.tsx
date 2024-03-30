import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import InlineCopyToClipboard from '@/components/utils/InlineCopyToClipboard'
import useMobileDetect from '@/lib/useMobileDetect'
import useURL from '@/lib/useURL'
import { Icon } from '@iconify-icon/react'
import Link from 'next/link'

export function WalletDownload() {
   const isMobile = useMobileDetect()
   const URL = useURL()

   return (
      <Card className="my-auto w-full max-w-96">
         <CardHeader>
            <CardTitle>
               {isMobile ? (
                  <Icon icon="arcticons:metamask" className="mr-1 align-middle text-2xl" />
               ) : null}
               Download MetaMask
            </CardTitle>
            <CardDescription>
               In order to use BlockT Dapp you first need to install MetaMask{' '}
               {isMobile ? 'app' : 'extension'} on your {isMobile ? 'device' : 'browser'}.
            </CardDescription>
         </CardHeader>
         <CardContent className="flex items-center gap-3">
            {isMobile ? (
               <span className="text-sm">
                  You can use BlockT on MetaMask app by inputing this url{' '}
                  <InlineCopyToClipboard truncate={false} value={URL} /> directly into the app{' '}
                  discover tab or by clicking the button below.
               </span>
            ) : (
               <>
                  <Icon icon="arcticons:metamask" className="text-5xl" />
                  Install the extension based on your current browser.
               </>
            )}
         </CardContent>
         <CardFooter className="flex gap-3 pt-2">
            {isMobile ? (
               <>
                  <Button className="w-full" variant="secondary" asChild>
                     <Link
                        className="flex items-center gap-1.5"
                        target="_blank"
                        href="https://play.google.com/store/apps/details?id=io.metamask"
                     >
                        Google Play
                        <Icon icon="uit:google-play" className="-mr-2 text-xl" />
                     </Link>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                     <Link
                        className="flex items-center gap-1.5"
                        target="_blank"
                        href={`https://metamask.app.link/dapp/${URL}`}
                     >
                        Open App
                        <Icon icon="ic:round-open-in-new" className="-mr-2 text-xl" />
                     </Link>
                  </Button>
               </>
            ) : (
               <>
                  <Button className="w-full" variant="secondary" asChild>
                     <Link
                        className="flex items-center gap-1.5"
                        target="_blank"
                        href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                     >
                        Chrome
                        <Icon icon="bxl:chrome" className="-mr-2 text-xl" />
                     </Link>
                  </Button>

                  <Button className="w-full" variant="outline" asChild>
                     <Link
                        className="flex items-center gap-1.5"
                        target="_blank"
                        href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/"
                     >
                        Mozilla
                        <Icon icon="mdi:mozilla-firefox" className="-mr-2 text-xl" />
                     </Link>
                  </Button>
               </>
            )}
         </CardFooter>
      </Card>
   )
}
