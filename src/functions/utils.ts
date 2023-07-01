export const debounce = (func: Function, duration: number) => {
  let timeout: NodeJS.Timeout | undefined

  return (...args: any[]) => {
    const effect = () => {
      timeout = undefined
      return func.apply(this, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(effect, duration)
  }
}
