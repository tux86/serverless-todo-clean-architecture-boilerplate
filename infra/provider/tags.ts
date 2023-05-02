import { StackTags } from '../../common/src/iac/serverless/provider.tags'

export const stackTags: StackTags = {
  Stage: '${sls:stage}',
  Product: 'TodoApp',
  Service: '${self:service}',
  ServiceRole: 'Stateful Infrastructure',
  ManagedBy: 'Serverless/CloudFormation',
  Owner: 'Walid Karray'
}
