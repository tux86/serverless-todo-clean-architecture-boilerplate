export const isOffline = (): boolean => {
  return process.env.IS_OFFLINE === 'true'
}
