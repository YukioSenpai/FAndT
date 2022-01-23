import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import { failure } from 'io-ts/lib/PathReporter'
import { orThrow } from '../framework/fp/either'


const envCodec = t.interface({
  VITE_SERVER_ENDPOINT: t.string,
  VITE_SUBSCRIPTION_SERVER_ENDPOINT: t.string,
  VITE_DEBUG: t.union([t.string, t.undefined]),
})

export const env = pipe(
        envCodec.decode(import.meta.env),
        orThrow((errors: t.Errors) => {
          throw new Error(
            `Failed to start application, missing env vars: ${failure(errors).join('\n')}`
          )
        }),
        a => ({
          serverEndpoint: a.VITE_SERVER_ENDPOINT,
          subscriptionServerEndpoint: a.VITE_SUBSCRIPTION_SERVER_ENDPOINT,
          isDebug: a.VITE_DEBUG && a.VITE_DEBUG === 'true',
        }))

