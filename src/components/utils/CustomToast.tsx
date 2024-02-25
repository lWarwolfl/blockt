import { Icon } from '@iconify-icon/react'
import { resolveValue, type Toast } from 'react-hot-toast'

interface Props {
   t: Toast
}

export function CustomToast({ t }: Props) {
   return (
      <div className="w-dvw max-w-md rounded-md border border-solid border-border bg-card/50 p-4 text-sm backdrop-blur-sm">
         {t.type === 'error' && (
            <Icon
               observe={false}
               icon="ic:round-warning-amber"
               className="mr-1.5 align-top text-2xl"
            />
         )}
         {t.type === 'success' && (
            <Icon
               observe={false}
               icon="ic:outline-library-add-check"
               className="mr-1.5 align-top text-2xl"
            />
         )}
         {t.type === 'loading' && (
            <Icon
               observe={false}
               icon="svg-spinners:90-ring-with-bg"
               className="mr-1.5 align-top text-2xl"
            />
         )}
         {resolveValue(t.message, t)}
      </div>
   )
}
