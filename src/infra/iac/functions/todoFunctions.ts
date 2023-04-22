import { AWS } from '@serverless/typescript'

export const todoFunctions : AWS['functions'] = {
  createTodo: {
    handler: 'src/presentation/handlers/todo.create',
    environment: {},
    events: [
      {
        http: {
          method: 'post',
          path: '/todos',
          cors: true
        }
      }
    ]
  }
}
