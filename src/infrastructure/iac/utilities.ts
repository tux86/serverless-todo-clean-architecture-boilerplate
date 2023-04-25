export function createHandlerPath(modulePath: string, handlerName: string): string {
  return `src/infrastructure/aws/lambda/${modulePath}.${handlerName}`
}

export const varToString = (varObj: Record<string, unknown>): string => {
  return Object.keys(varObj)[0]
}

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

export const generatePrefixedSsmParameterName = (
  parameterName: string,
  serviceName = '${self:service}',
  environment = '${sls:stage}'
): string => {
  return `/${serviceName}/${environment}/${parameterName}`
}

export const ssmParameter = (
  parameterName: string,
  serviceName = '${self:service}',
  environment = '${sls:stage}'
): string => {
  return ['${ssm:', `/${serviceName}/${environment}/${parameterName}`, '}'].join('')
}
