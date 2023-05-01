import { AwsResourceTags } from '@serverless/typescript'

export const stackTags: AwsResourceTags = {
  Stage: '${sls:stage}',
  Product: 'Todo API',
  Service: '${self:service}',
  ServiceRole: 'Backend',
  ManagedBy: 'Serverless CloudFormation',
  Owner: 'Walid Karray'
}

export const tags: AwsResourceTags = {
  ...stackTags
}
