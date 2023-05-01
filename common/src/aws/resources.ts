/**
 * Generates a namespaced resource name by combining the provided name
 * with a prefix and a separator.
 */
export const generatePrefixedResourceName = (name: string): string => ['${self:service}', '${sls:stage}', name].join('-')

