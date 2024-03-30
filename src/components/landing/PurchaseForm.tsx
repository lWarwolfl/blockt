import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import getVendingMachineBalance from '@/lib/methods/getVendingMachineBalance'
import owner from '@/lib/methods/owner'
import purchase, { costPerDonut } from '@/lib/methods/purchase'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { walletBalance } from '@/lib/web3/wallet'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify-icon/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
   amount: z.number().int(),
})

export function PurchaseForm() {
   const { walletAddress, metamask, update, updateNow } = useStore()
   const [transactionLoading, setTransactionLoading] = useState<boolean>(false)
   const [vendingMachineBalanceLoading, setVendingMachineBalanceLoading] = useState<boolean>(false)
   const [vendingMachineBalance, setVendingMachineBalance] = useState<number>(0)
   const [userWalletBalanceLoading, setUserWalletBalanceLoading] = useState<boolean>(false)
   const [userWalletBalance, setUserWalletBalance] = useState<number | undefined>(undefined)
   const [isOwner, setIsOwner] = useState<boolean>(false)
   const [totalCost, setTotalCost] = useState<number>(0)

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         amount: undefined,
      },
   })

   async function onSubmit(values: z.infer<typeof formSchema>) {
      const response = await purchase(
         { address: walletAddress, amount: values.amount },
         { loading: setTransactionLoading }
      )

      if (response) updateNow()
   }

   form.watch((value) => {
      const amount = value.amount || 0
      const cost = amount * costPerDonut
      setTotalCost(cost)
   })

   useEffect(() => {
      async function fetchInitialData() {
         if (useStore.getState().metamask) {
            const balanceTemp = await getVendingMachineBalance({
               loading: setVendingMachineBalanceLoading,
            })
            setVendingMachineBalance(Number(balanceTemp))
         }
      }

      fetchInitialData()
   }, [metamask, update])

   async function fetchInitialData(loading: boolean = true) {
      if (useStore.getState().metamask && useStore.getState().walletAddress !== '') {
         const userWalletBalanceTemp = await walletBalance(
            { address: useStore.getState().walletAddress },
            {
               loading: loading ? setUserWalletBalanceLoading : undefined,
            }
         )
         setUserWalletBalance(Number(userWalletBalanceTemp))
      } else {
         setUserWalletBalance(undefined)
      }
   }

   useEffect(() => {
      setInterval(() => fetchInitialData(false), 15000)
   }, [])

   useEffect(() => {
      fetchInitialData()
   }, [metamask, update, walletAddress])

   useEffect(() => {
      async function fetchOwner() {
         if (useStore.getState().metamask && useStore.getState().walletAddress !== '') {
            const ownerAddress = await owner({})

            if (useStore.getState().walletAddress === String(ownerAddress)) setIsOwner(true)
         } else if (useStore.getState().walletAddress === '') {
            setIsOwner(false)
         }
      }

      fetchOwner()
   }, [metamask, walletAddress])

   return (
      <Card className="my-auto w-full max-w-96">
         <CardHeader>
            <CardTitle className="flex items-center">
               <Icon icon="solar:donut-line-duotone" className="mr-1 align-middle text-2xl" />
               Donut Vending Machine
               <span className="ml-auto inline-flex items-center gap-2">
                  {isOwner ? (
                     <>
                        <Button variant="outline" size="icon" asChild>
                           <Link href="/withdraw">
                              <Icon icon="ic:round-money" className="text-lg" />
                           </Link>
                        </Button>

                        <Button variant="outline" size="icon" asChild>
                           <Link href="/restock">
                              <Icon icon="ic:outline-inventory-2" className="text-lg" />
                           </Link>
                        </Button>
                     </>
                  ) : null}
               </span>
            </CardTitle>
            <CardDescription>
               {vendingMachineBalanceLoading ? (
                  <Icon icon="line-md:loading-twotone-loop" className="align-middle text-2xl" />
               ) : (
                  <span className="text-card-foreground">{vendingMachineBalance}</span>
               )}{' '}
               Remaining donuts in the machine
               {userWalletBalance && userWalletBalance < costPerDonut ? (
                  <>
                     . If you needed MATIC for testing you can get it from this{' '}
                     <Link
                        href="https://faucet.polygon.technology/"
                        target="_blank"
                        className="cursor-pointer text-card-foreground underline-offset-2 hover:underline"
                     >
                        faucet
                        <Icon icon="ic:outline-water-drop" className="ml-1 align-middle text-lg" />
                     </Link>
                  </>
               ) : null}
            </CardDescription>
         </CardHeader>
         <CardContent className="-mt-2">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                  <FormField
                     control={form.control}
                     name="amount"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Amount</FormLabel>
                           <FormControl>
                              <Input
                                 type="number"
                                 placeholder="Number of Donuts"
                                 {...field}
                                 onChange={(e) =>
                                    field.onChange(
                                       e.target.value === '' ? undefined : Number(e.target.value)
                                    )
                                 }
                              />
                           </FormControl>
                           <FormDescription>
                              <span className="text-card-foreground">1</span> Donut ={' '}
                              <span className="text-card-foreground">
                                 {costPerDonut.toFixed(4)}
                              </span>{' '}
                              MATIC
                              <br />
                              Total cost:{' '}
                              <span
                                 className={cn('text-card-foreground', {
                                    ['text-destructive']:
                                       userWalletBalance && totalCost > userWalletBalance,
                                 })}
                              >
                                 {totalCost.toFixed(4)}
                              </span>{' '}
                              MATIC
                              <br />
                              Your balance:{' '}
                              <span className="text-card-foreground">
                                 {userWalletBalanceLoading ? (
                                    <Icon
                                       icon="line-md:loading-twotone-loop"
                                       className="align-middle text-2xl"
                                    />
                                 ) : (
                                    <span className="text-card-foreground">
                                       {userWalletBalance?.toFixed(4)}
                                    </span>
                                 )}
                              </span>{' '}
                              {userWalletBalance ? 'MATIC' : 'Please connect your wallet'}
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </form>
            </Form>
         </CardContent>
         <CardFooter className="flex justify-between">
            <Button
               onClick={form.handleSubmit(onSubmit)}
               type="submit"
               disabled={
                  totalCost === 0 ||
                  vendingMachineBalance <= 0 ||
                  !walletAddress ||
                  walletAddress === '' ||
                  totalCost > (userWalletBalance ? userWalletBalance : 0)
               }
               className="gap-1.5"
            >
               Purchase Now
               {transactionLoading ? (
                  <Icon icon="line-md:loading-twotone-loop" className="-mr-2 text-xl" />
               ) : (
                  <Icon icon="ic:outline-payments" className="-mr-2 text-xl" />
               )}
            </Button>
         </CardFooter>
      </Card>
   )
}
