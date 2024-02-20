import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify-icon/react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
   const { setTheme } = useTheme()

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
               <Icon
                  icon="line-md:moon-to-sunny-outline-loop-transition"
                  className="absolute block text-xl dark:hidden"
               />
               <Icon
                  icon="line-md:sunny-outline-to-moon-alt-loop-transition"
                  className="absolute hidden text-xl dark:block"
               />
               <span className="sr-only">Toggle theme</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setTheme('light')} className="flex gap-2">
               <Icon icon="line-md:sunny-outline-loop" className="text-xl" />
               Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')} className="flex gap-2">
               <Icon icon="line-md:moon-alt-loop" className="text-xl" />
               Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')} className="flex gap-2">
               <Icon icon="ic:outline-memory" className="text-xl" />
               System
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
