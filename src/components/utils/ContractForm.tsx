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
   contractAddress: z.string().refine((value) => /^0x[a-fA-F0-9]{40}$/i.test(value), {
      message: 'Invalid contract contractAddress format.',
   }),
})

export function ContractForm() {
   const { contractAddress, setAddress } = useStore()

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         contractAddress: '',
      },
   })

   function onSubmit(values: z.infer<typeof formSchema>) {
      setAddress(values.contractAddress)
   }

   return (
      <Card className="my-auto w-full max-w-96">
         <CardHeader>
            <CardTitle>Save contract contractAddress</CardTitle>
            <CardDescription>
               Start working with a smart contract on ethereum blockchain network.
            </CardDescription>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                  <FormField
                     control={form.control}
                     name="contractAddress"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Address</FormLabel>
                           <FormControl>
                              <Input placeholder="Contract contractAddress" {...field} />
                           </FormControl>
                           <FormDescription>
                              Current contractAddress:{' '}
                              {contractAddress && contractAddress !== ''
                                 ? contractAddress
                                 : 'not set'}
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
