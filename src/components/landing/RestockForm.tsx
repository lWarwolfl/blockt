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
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import getVendingMachineBalance from '@/lib/methods/getVendingMachineBalance'
import owner from '@/lib/methods/owner'
import restock from '@/lib/methods/restock'
import { useStore } from '@/lib/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify-icon/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
   amount: z.number().int(),
})

export function RestockForm() {
   const router = useRouter()

   const { walletAddress, metamask, update, updateNow } = useStore()
   const [transactionLoading, setTransactionLoading] = useState<boolean>(false)
   const [balanceLoading, setBalanceLoading] = useState<boolean>(false)

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         amount: undefined,
      },
   })

   const [count, setCount] = useState<number>(0)

   async function onSubmit(values: z.infer<typeof formSchema>) {
      const response = await restock(
         { address: walletAddress, amount: values.amount },
         { loading: setTransactionLoading }
      )

      if (response) updateNow()
   }

   form.watch((value) => {
      setCount(Number(value.amount))
   })

   const [vendingMachineBalance, setVendingMachineBalance] = useState<number>(0)

   useEffect(() => {
      async function fetchInitialData() {
         if (metamask) {
            const balanceTemp = await getVendingMachineBalance({ loading: setBalanceLoading })
            setVendingMachineBalance(Number(balanceTemp))
         }
      }

      fetchInitialData()
   }, [metamask, update])

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
               <Icon icon="ic:outline-inventory-2" className="mr-1 align-middle text-2xl" />
               Restock Vending Machine
               <span className="ml-auto inline-flex items-center gap-2">
                  <Button variant="outline" size="icon" asChild>
                     <Link href="/">
                        <Icon icon="ic:outline-arrow-back" className="text-lg" />
                     </Link>
                  </Button>
               </span>
            </CardTitle>
            <CardDescription>
               {balanceLoading ? (
                  <Icon icon="line-md:loading-twotone-loop" className="align-middle text-2xl" />
               ) : (
                  vendingMachineBalance
               )}{' '}
               Remaining update in the machine
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
                  !metamask || !walletAddress || walletAddress === '' || !count || count <= 0
               }
               className="gap-1.5"
            >
               Restock
               {transactionLoading ? (
                  <Icon icon="line-md:loading-twotone-loop" className="-mr-2 text-xl" />
               ) : (
                  <Icon icon="ic:outline-add" className="-mr-2 text-xl" />
               )}
            </Button>
         </CardFooter>
      </Card>
   )
}
