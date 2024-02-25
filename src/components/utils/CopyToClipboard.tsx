import { getErrorMessage } from '@/lib/error'
import { Icon } from '@iconify-icon/react'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { Button, type ButtonProps } from '../ui/button' // Assuming ButtonProps is imported correctly

interface Props extends ButtonProps {
   chars?: number
   value: string
}

export default function CopyToClipboard(props: Props) {
   const { chars = 14, value } = props
   const wrapperRef = React.createRef<HTMLButtonElement>()
   const [infoNotice, setInfoNotice] = useState('')

   const triggerCopy = useCallback(async () => {
      try {
         await navigator.clipboard.writeText(value.toString())
      } catch (error) {
         toast.error(getErrorMessage(error))
      }

      await new Promise((r) => setTimeout(() => r(setInfoNotice('Copied to clipboard!')), 50))

      setTimeout(() => {
         setTimeout(() => setInfoNotice(''), 50)
      }, 2000)
   }, [value])

   const displayValue =
      value.length <= chars
         ? value
         : `${value.slice(0, chars / 2 - 1)}...${value.slice(-chars / 2 + 2)}`

   return (
      <Button {...props} ref={wrapperRef} onClick={triggerCopy}>
         {infoNotice || (
            <>
               {displayValue}
               <Icon icon="ic:baseline-content-copy" className="-mr-2 ml-1 text-xl" />
            </>
         )}
      </Button>
   )
}
