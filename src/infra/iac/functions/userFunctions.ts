import { AWS } from '@serverless/typescript'

export const userFunctions : AWS['functions'] = {
  createUser: {
    handler: 'src/presentation/handlers/user.createUser',
    environment: {},
    events: [
      {
        httpApi: {
          method: 'post',
          path: '/user'
        }
      }
    ]
  },
  authenticateUser: {
    handler: 'src/presentation/handlers/user.getUser',
    environment: {},
    events: [
      {
        httpApi: {
          method: 'post',
          path: '/authenticate'
        }
      }
    ]
  },
  getUser: {
    handler: 'src/presentation/handlers/user.getUser',
    environment: {},
    events: [
      {
        httpApi: {
          method: 'get',
          path: '/user/{email}'
        }
      }
    ]
  }
}
