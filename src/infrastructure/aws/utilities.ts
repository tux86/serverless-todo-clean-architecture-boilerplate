import { AwsCfInstruction } from '@serverless/typescript'

export const varToString = (varObj: Record<string, unknown>) => Object.keys(varObj)[0]

export type AuthorizerConfig =
    | { arn: AwsCfInstruction }
    | {
    name: string;
    identitySource: string;
    type: string;
};
