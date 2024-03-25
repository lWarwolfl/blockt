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
import { useStore } from '@/lib/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify-icon/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
   amount: z.number().int(),
})

export function DonutForm() {
   const { metamask } = useStore()

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         amount: undefined,
      },
   })

   const [totalCost, setTotalCost] = useState<number>(0)
   const costPerDonut: number = 0.0005

   function onSubmit(values: z.infer<typeof formSchema>) {
      return values
   }

   form.watch((value) => {
      const amount = value.amount || 0
      const cost = amount * costPerDonut
      setTotalCost(cost)
   })

   return (
      <Card className="my-auto w-full max-w-96">
         <CardHeader>
            <CardTitle>
               <Icon icon="solar:donut-line-duotone" className="mr-1 align-middle text-2xl" />
               Donut Vending Machine
            </CardTitle>
            <CardDescription>Remaining donuts in the machine</CardDescription>
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
                              <Input placeholder="Number of Donuts" {...field} />
                           </FormControl>
                           <FormDescription>
                              1 Donut = {costPerDonut} ETH <br />
                              Total cost: {totalCost.toFixed(4)} ETH
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
               disabled={!metamask || totalCost === 0}
            >
               Purchase Now
            </Button>
         </CardFooter>
      </Card>
   )
}
