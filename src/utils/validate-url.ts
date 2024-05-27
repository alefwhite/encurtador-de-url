export const validateUrl = (url: string): boolean => {
  if (!url) return false
  const urlLowerCase = url.toLowerCase()
  const urlRegex = /^http(s)?:\/\//
  return urlRegex.test(urlLowerCase)
}
