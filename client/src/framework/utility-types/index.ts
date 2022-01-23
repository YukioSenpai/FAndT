/**
 * Drop the "null" from all subtypes and replace them with "undefined".
 * Used to simplify handling of graphql responses
 */
export type DeepNonNull<T> = T extends (...args: any[]) => any
  ? NonNull<T>
  : T extends any[]
  ? NonNull<_DeepNonNullArray<T[number]>>
  : T extends object
  ? NonNull<_DeepNonNullObject<T>>
  : NonNull<T>
interface _DeepNonNullArray<T> extends Array<DeepNonNull<NonNull<T>>> {}
type _DeepNonNullObject<T> = {
  [P in keyof T]: DeepNonNull<NonNull<T[P]>>
}
export type NonNull<T> = Exclude<T, null>

export type Unpacked<T> = T extends (infer U)[] ? U : T
