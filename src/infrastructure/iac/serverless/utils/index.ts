export * from './ssm'
export * from './lambda'
export * from './resources'
export * from './events'

export const varToString = (varObj: Record<string, unknown>): string => {
  return Object.keys(varObj)[0]
}
