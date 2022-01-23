import { ApolloCache } from '@apollo/client/cache'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { DocumentNode } from 'graphql'

interface CacheDeleteOptions<QueryType> {
  node: DocumentNode
  variables: { [field: string]: string | number }
  updater: (data: QueryType) => QueryType | null | undefined
}

export const onDeleteUpdater = <QueryType>(config: CacheDeleteOptions<QueryType>) => {
  return (cache: ApolloCache<any>) => {
    const inCacheData = cache.readQuery<QueryType>({
      query: config.node,
      variables: config.variables,
    })

    pipe(
      inCacheData,
      O.fromNullable,
      O.map(config.updater),
      O.map(data =>
        cache.writeQuery({
          query: config.node,
          variables: config.variables,
          data,
        })
      )
    )
  }
}
