import { Icon } from '@iconify-icon/react'
import { resolveValue, type Toast } from 'react-hot-toast'

interface Props {
   t: Toast
}

export function CustomToast({ t }: Props) {
   return (
      <div className="xs:p-4 w-dvw max-w-md break-words rounded-md border border-solid border-border bg-card/50 p-2 text-sm backdrop-blur-sm">
         <Icon
            icon={
               t.type === 'success'
                  ? 'ic:outline-library-add-check'
                  : t.type === 'error'
                    ? 'ic:round-warning-amber'
                    : 'svg-spinners:90-ring-with-bg'
            }
            className="mr-1.5 align-top text-2xl"
         />
         {resolveValue(t.message, t)}
      </div>
   )
}
