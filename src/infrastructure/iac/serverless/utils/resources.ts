/**
 * Generates a namespaced resource name by combining the provided name
 * with a prefix and a separator.
 */
export const generatePrefixedResourceName = (
  name: string,
  serviceName = '${self:service}',
  environment = '${sls:stage}'
): string => {
  return [serviceName, environment, name].join('-')
}
