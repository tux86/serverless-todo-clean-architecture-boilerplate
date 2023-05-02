import { AwsResourceTags } from '@serverless/typescript'


export interface StackTags extends AwsResourceTags {
  Stage: '${sls:stage}',
  Product: 'TodoApp'
  Service: '${self:service}',
  ServiceRole: string,
  ManagedBy: 'Serverless/CloudFormation',
  Owner: 'Walid Karray'
}
