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
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
   address: z.string().refine((value) => /^0x[a-fA-F0-9]{40}$/i.test(value), {
      message: 'Invalid contract address format.',
   }),
})

export function ContractForm() {
   const { address, setAddress } = useStore()

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         address: '',
      },
   })

   function onSubmit(values: z.infer<typeof formSchema>) {
      setAddress(values.address)
   }

   return (
      <Card className="my-auto w-full max-w-96">
         <CardHeader>
            <CardTitle>Save contract address</CardTitle>
            <CardDescription>
               Start working with a smart contract on ethereum blockchain network.
            </CardDescription>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                  <FormField
                     control={form.control}
                     name="address"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Address</FormLabel>
                           <FormControl>
                              <Input placeholder="Contract address" {...field} />
                           </FormControl>
                           <FormDescription>
                              Current address: {address && address !== '' ? address : 'not set'}
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </form>
            </Form>
         </CardContent>
         <CardFooter className="flex justify-between">
            <Button onClick={form.handleSubmit(onSubmit)} type="submit" className="mt-2">
               Confirm
            </Button>
         </CardFooter>
      </Card>
   )
}
