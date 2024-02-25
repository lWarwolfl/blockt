// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any) => {
   if ("message" in error) return error.message
   return String(error)
}
