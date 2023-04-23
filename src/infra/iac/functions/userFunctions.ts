import { AWS } from '@serverless/typescript'

export const userFunctions : AWS['functions'] = {
  createUser: {
    handler: 'src/presentation/handlers/userHandler.createUser',
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
    handler: 'src/presentation/handlers/userHandler.authenticateUser',
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
    handler: 'src/presentation/handlers/userHandler.getUser',
    environment: {},
    events: [
      {
        httpApi: {
          method: 'get',
          path: '/users/{email}'
        }
      }
    ]
  }
}
