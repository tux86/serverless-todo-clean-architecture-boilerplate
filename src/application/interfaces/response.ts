export interface Response<T> {
  body: T
  statusCode: number
  headers?: { [key: string]: string }
}
