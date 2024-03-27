import { useEffect, useState } from 'react'

export default function useMobileDetect(): boolean {
   const [isMobile, setIsMobile] = useState<boolean>(false)

   useEffect(() => {
      const userAgent = navigator.userAgent
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isMobileScreenSize = window.innerWidth < 768
      const isMobileUA = /iPhone|iPad|iPod|Android/i.test(userAgent)

      setIsMobile(isTouchDevice || isMobileScreenSize || isMobileUA)
   }, [])

   return isMobile
}
