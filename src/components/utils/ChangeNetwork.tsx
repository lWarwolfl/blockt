import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { switchNetwork } from '@/lib/web3/network'
import { Icon } from '@iconify-icon/react'
import { useState } from 'react'

export function ChangeNetwork() {
   const [networkLoading, setNetworkLoading] = useState<boolean>(false)

   return (
      <Card className="my-auto w-full max-w-96">
         <CardHeader>
            <CardTitle>
               <Icon icon="ic:outline-change-circle" className="mr-1 align-middle text-2xl" />
               Please switch your network
            </CardTitle>
            <CardDescription>
               BlockT Dapp currently works on Polygon Amoy testnet only.
            </CardDescription>
         </CardHeader>
         <CardContent className="text-sm">
            You can switch your network manually or use the button below to connect to Polygon{' '}
            Amoy testnet automatically.
         </CardContent>
         <CardFooter className="pt-2">
            <Button
               className="w-full gap-1.5"
               variant="secondary"
               onClick={() => switchNetwork({}, { loading: setNetworkLoading })}
            >
               Connect To Network
               {networkLoading ? (
                  <Icon icon="line-md:loading-twotone-loop" className="align-middle text-2xl" />
               ) : (
                  <Icon icon="cryptocurrency:matic" className="-mr-2 text-xl" />
               )}
            </Button>
         </CardFooter>
      </Card>
   )
}
