export type StringMap = { [name: string]: string; }
export type Dictionary<T = any> = { [key: string]: T }
export type Constructor<T = {}> = new (...args: any[]) => T
