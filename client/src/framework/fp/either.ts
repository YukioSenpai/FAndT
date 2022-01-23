import * as E from 'fp-ts/lib/Either'
import { Either } from 'fp-ts/lib/Either'

export const orThrow =
  <L>(onLeft: (e: L) => Error) =>
  <A>(e: Either<L, A>): A => {
    if (E.isLeft(e)) {
      throw onLeft(e.left)
    } else {
      return e.right
    }
  }
