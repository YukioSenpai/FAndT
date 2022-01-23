
export const APP_SECRET = 'appsecret321'

// interface Token {
//   userId: string
// }

// export function getUserId(context: Context) {
//   const authHeader = context.req.get('Authorization')
//   if (authHeader) {
//     const token = authHeader.replace('Bearer ', '')
//     const verifiedToken = verify(token, APP_SECRET) as Token
//     return verifiedToken && Number(verifiedToken.userId)
//   }
// }

// export function decodeToken(context: Context) {
//   const authHeader = context.req.headers["authorization"]
//   if (authHeader) {
//     const token = authHeader.replace('Bearer ', '')
//     const verifiedToken = verify(token, APP_SECRET) as Token
//     return verifiedToken 
//   }
//   return null
// }