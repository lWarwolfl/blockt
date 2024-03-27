import React from 'react'

export default function useWindowSize(size: number): boolean {
   const [value, setValue] = React.useState<boolean>(false)

   React.useEffect(() => {
      setValue(window.innerWidth <= size)

      const handleResize = () => {
         setValue(window.innerWidth <= size)
      }

      window.addEventListener('resize', handleResize)

      return () => {
         window.removeEventListener('resize', handleResize)
      }
   }, [size])

   return value
}
