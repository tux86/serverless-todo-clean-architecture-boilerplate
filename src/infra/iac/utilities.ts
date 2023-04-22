
export const varToString = (varObj: Record<string, unknown>) : string => {
  return Object.keys(varObj)[0]
}

// add prefix to a cloud resource name
export const withPrefix = (name :string, prefix = '${self:service}-${sls:stage}-') : string => {
  return [prefix, name].join('')
}

// export type AuthorizerConfig =
//     | { arn: AwsCfInstruction }
//     | {
//     name: string;
//     identitySource: string;
//     type: string;
// };
