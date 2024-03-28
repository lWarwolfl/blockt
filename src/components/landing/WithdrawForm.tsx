import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import getBalance from '@/lib/methods/getBalance'
import owner from '@/lib/methods/owner'
import withdraw from '@/lib/methods/withdraw'
import { useStore } from '@/lib/store'
import { networks } from '@/lib/web3/networks'
import { Icon } from '@iconify-icon/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function WithdrawForm() {
   const router = useRouter()

   const { walletAddress, metamask, rerender, rerenderNow } = useStore()
   const [transactionLoading, setTransactionLoading] = useState<boolean>(false)
   const [balanceLoading, setBalanceLoading] = useState<boolean>(false)

   async function submit() {
      const response = await withdraw(
         { address: walletAddress },
         { loading: setTransactionLoading }
      )

      if (response) rerenderNow()
   }

   const [balance, setBalance] = useState<number>(0)

   useEffect(() => {
      async function fetchInitialData() {
         if (metamask) {
            const balanceTemp = await getBalance({ loading: setBalanceLoading })
            setBalance(Number(balanceTemp))
         }
      }

      fetchInitialData()
   }, [metamask, rerender])

   useEffect(() => {
      async function fetchOwner() {
         if (metamask && walletAddress && walletAddress !== '') {
            const ownerAddress = await owner({})

            if (walletAddress !== String(ownerAddress)) router.push('/')
         }
      }

      fetchOwner()
   }, [metamask, walletAddress, router])

   return (
      <Card className="my-auto w-full max-w-96">
         <CardHeader>
            <CardTitle className="flex items-center">
               <Icon icon="ic:round-money" className="mr-1 align-middle text-2xl" />
               Withdraw contract balance
               <span className="ml-auto inline-flex items-center gap-2">
                  <Button variant="outline" size="icon" asChild>
                     <Link href="/">
                        <Icon icon="ic:outline-arrow-back" className="text-lg" />
                     </Link>
                  </Button>
               </span>
            </CardTitle>
            <CardDescription>
               Current contract balance is:{' '}
               {balanceLoading ? (
                  <Icon icon="line-md:loading-twotone-loop" className="align-middle text-2xl" />
               ) : (
                  balance /
                  (networks[0]
                     ? Math.pow(10, networks[0].nativeCurrency.decimals)
                     : Math.pow(10, 18))
               )}{' '}
               MATIC
            </CardDescription>
         </CardHeader>
         <CardFooter className="mt-2 flex justify-between">
            <Button
               onClick={() => submit()}
               type="submit"
               disabled={
                  !metamask || !walletAddress || walletAddress === '' || !balance || balance <= 0
               }
               className="gap-1.5"
            >
               Withdraw
               {transactionLoading ? (
                  <Icon icon="line-md:loading-twotone-loop" className="-mr-2 text-xl" />
               ) : (
                  <Icon icon="ic:round-call-received" className="-mr-2 text-xl" />
               )}
            </Button>
         </CardFooter>
      </Card>
   )
}
