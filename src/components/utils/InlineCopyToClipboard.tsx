import { getErrorMessage } from '@/lib/error'
import { Icon } from '@iconify-icon/react'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

interface ComponentSpecificProps {
   truncate?: boolean
   chars?: number
   value: string
}

type SpanProps = Omit<React.HTMLAttributes<HTMLSpanElement>, keyof ComponentSpecificProps>

interface Props extends ComponentSpecificProps, SpanProps {}

export default function InlineCopyToClipboard({
   truncate = true,
   chars = 14,
   value,
   ...spanProps
}: Props) {
   const wrapperRef = React.useRef<HTMLSpanElement>(null)
   const [infoNotice, setInfoNotice] = useState('')

   const triggerCopy = useCallback(async () => {
      try {
         await navigator.clipboard.writeText(value.toString())
         toast.success('Copied to clipboard!')
      } catch (error) {
         toast.error(getErrorMessage(error))
      }

      setTimeout(() => setInfoNotice(''), 2000)
   }, [value])

   const displayValue = truncate
      ? value.length <= chars
         ? value
         : `${value.slice(0, chars / 2 - 1)}...${value.slice(-chars / 2 + 2)}`
      : value

   return (
      <span
         {...spanProps}
         ref={wrapperRef}
         onClick={triggerCopy}
         className="cursor-pointer select-none break-words text-muted-foreground underline-offset-4 hover:underline"
      >
         {infoNotice || (
            <>
               {displayValue}
               <Icon icon="ic:baseline-content-copy" className="ml-1 align-text-bottom text-lg" />
            </>
         )}
      </span>
   )
}
