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
