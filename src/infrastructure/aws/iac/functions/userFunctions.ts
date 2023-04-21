export const userFunctions = {
  createUser: {
    handler: 'src/presentation/handlers/user.createUser',
    environment: {
    },
    events: [
      {
        http: {
          method: 'post',
          path: '/user',
          cors: true
        }
      }
    ]
  },
  authenticateUser: {
    handler: 'src/presentation/handlers/user.getUser',
    environment: {
    },
    events: [
      {
        http: {
          method: 'post',
          path: '/authenticate',
          cors: true
        }
      }
    ]
  },
  getUser: {
    handler: 'src/presentation/handlers/user.getUser',
    environment: {
    },
    events: [
      {
        http: {
          method: 'get',
          path: '/user/{email}',
          cors: true
        }
      }
    ]
  }
}
