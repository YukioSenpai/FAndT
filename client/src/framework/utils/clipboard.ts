export const copy = (data: string, message?: string) => {
  const input = document.createElement('textarea')
  document.body.appendChild(input)
  input.value = data
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}
