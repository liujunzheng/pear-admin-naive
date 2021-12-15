declare interface Recordable {
  [key: string]: any
}

declare type Nullable<T> = T | null

declare type PromiseFn<T = any, U = T> = (...args: T[]) => Promise<U>
