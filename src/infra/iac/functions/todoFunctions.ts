import { AWS } from '@serverless/typescript'

export const todoFunctions: AWS['functions'] = {
  createTodo: {
    handler: 'src/presentation/handlers/todo.createTodo',
    events: [
      {
        httpApi: {
          method: 'post',
          path: '/todos'
        }
      }
    ]
  },
  getTodo: {
    handler: 'src/presentation/handlers/todo.getTodo',
    events: [
      {
        httpApi: {
          method: 'get',
          path: '/todos/{id}'
        }
      }
    ]
  },
  listTodos: {
    handler: 'src/presentation/handlers/todo.listTodos',
    events: [
      {
        httpApi: {
          method: 'get',
          path: '/todos'
        }
      }
    ]
  },
  updateTodo: {
    handler: 'src/presentation/handlers/todo.updateTodo',
    events: [
      {
        httpApi: {
          method: 'put',
          path: '/todos/{todoId}'
        }
      }
    ]
  },
  deleteTodo: {
    handler: 'src/presentation/handlers/todo.deleteTodo',
    events: [
      {
        httpApi: {
          method: 'delete',
          path: '/todos/{todoId}'
        }
      }
    ]
  }
}
