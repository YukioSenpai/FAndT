export const minifyJsonData = (data: string | undefined): string | undefined => {
  try {
    return data && JSON.stringify(JSON.parse(data))
  } catch (e) {
    console.log('Failed to minify json', e)
    return data
  }
}

export const prettifyJsonData = (data: string | undefined): string | undefined => {
  try {
    return data && JSON.stringify(JSON.parse(data), null, 2)
  } catch (e) {
    console.log('Failed to prettify json', e)
    return data
  }
}
