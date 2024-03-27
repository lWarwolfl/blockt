import { useEffect, useState } from 'react'

export default function useURL(): string {
   const [URL, setURL] = useState<string>('')

   useEffect(() => {
      if (window) setURL(window?.location.host)
   }, [])

   return URL
}
