import { AWSIam } from '../../../../common/src/iac/serverless/types'

// WARNING: This is not a best practice. Granting an IAM role with a wide set of permissions
// (like allowing all actions on all resources) can lead to security vulnerabilities.
// Instead, use the principle of least privilege and provide only necessary permissions.
export const defaultIam: AWSIam = {
  role: {
    statements: [
      {
        Effect: 'Allow',
        Action: '*',
        Resource: '*'
      }
    ]
  }
}
