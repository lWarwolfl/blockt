import React from 'react'

export default function useWindowSmallerThan(size: number) {
   const [value, setValue] = React.useState(false)

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
