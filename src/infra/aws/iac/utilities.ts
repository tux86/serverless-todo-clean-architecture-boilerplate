export const isOffline = (): boolean => {
  return process.env.IS_OFFLINE === 'true'
}

export const varToString = (varObj: Record<string, unknown>) : string => {
  return Object.keys(varObj)[0]
}

// export type AuthorizerConfig =
//     | { arn: AwsCfInstruction }
//     | {
//     name: string;
//     identitySource: string;
//     type: string;
// };
