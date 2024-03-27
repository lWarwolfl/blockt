import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { Icon } from '@iconify-icon/react'
import Link from 'next/link'

export function WalletDownload() {
   return (
      <Card className="my-auto w-full max-w-96">
         <CardHeader>
            <CardTitle>Download MetaMask</CardTitle>
            <CardDescription>
               In order to use what this app offers you first need to install MetaMask extension on
               your browser.
            </CardDescription>
         </CardHeader>
         <CardContent className="flex items-center gap-3">
            <Icon icon="arcticons:metamask" className="text-5xl" />
            Install the extension based on your current browser.
         </CardContent>
         <CardFooter className="flex gap-3 pt-2">
            <Button className="w-full" asChild variant="secondary">
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
         </CardFooter>
      </Card>
   )
}
